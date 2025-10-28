/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { MessageType } from '@/types/chat.types';
import { Mic, Send, StopCircle, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Props = {
  sendMessage: (
    content: string,
    type?: MessageType,
    fileId?: string | null,
  ) => Promise<any>;
  uploadFiles: (formData: FormData, token?: string) => Promise<any>;
  socketToken?: string | null;
};

export default function ChatMicInput({
  sendMessage,
  uploadFiles,
  socketToken,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      stopTimer();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, []);

  const openRecordingModal = () => {
    if (!socketToken) return alert('Socket not authenticated');
    setError(null);
    setRecordedBlob(null);
    setAudioUrl(null);
    setSeconds(0);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsRecording(false);
    stopTimer();
    chunksRef.current = [];
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== 'inactive'
    ) {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
  };

  const startTimer = () => {
    stopTimer();
    timerRef.current = window.setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const formatTime = (s: number) => {
    const mm = Math.floor(s / 60)
      .toString()
      .padStart(2, '0');
    const ss = (s % 60).toString().padStart(2, '0');
    return `${mm}:${ss}`;
  };

  const startRecording = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const supportedMime = [
        'audio/webm;codecs=opus',
        'audio/ogg;codecs=opus',
        'audio/webm',
        'audio/ogg',
      ].find((m) => MediaRecorder.isTypeSupported(m));
      const mediaRecorder = new MediaRecorder(
        stream,
        supportedMime ? { mimeType: supportedMime } : undefined,
      );
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (ev) => {
        if (ev.data && ev.data.size > 0) {
          chunksRef.current.push(ev.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: chunksRef.current[0]?.type || 'audio/webm',
        });
        setRecordedBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        stopTimer();
        setIsRecording(false);
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((t) => t.stop());
          streamRef.current = null;
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setSeconds(0);
      startTimer();
    } catch (err: any) {
      console.error('mic error', err);
      setError('Unable to access microphone. Check permissions.');
    }
  };

  const stopRecording = () => {
    if (!mediaRecorderRef.current) return;
    if (mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const handleSendRecording = async () => {
    if (!recordedBlob) return;
    if (!socketToken) return alert('Socket not authenticated');

    setIsUploading(true);
    setError(null);

    try {
      const now = Date.now();
      const ext = recordedBlob.type.includes('ogg')
        ? 'ogg'
        : recordedBlob.type.includes('mp3')
          ? 'mp3'
          : 'webm';
      const filename = `voice-${now}.${ext}`;
      const file = new File([recordedBlob], filename, {
        type: recordedBlob.type,
      });

      const formData = new FormData();
      formData.append('files', file);

      const data = await uploadFiles(formData, socketToken);

      // call parent sendMessage so all messages go through same flow
      if (Array.isArray(data)) {
        for (const f of data) {
          const fileType = f.mimeType?.startsWith('audio/')
            ? MessageType.AUDIO
            : MessageType.FILE;
          await sendMessage(f.originalName || 'Voice message', fileType, f.id);
        }
      } else {
        const fileType = data.mimeType?.startsWith('audio/')
          ? MessageType.AUDIO
          : MessageType.FILE;
        await sendMessage(
          data.originalName || 'Voice message',
          fileType,
          data.id,
        );
      }

      // success - close and cleanup
      closeModal();
    } catch (err) {
      console.error('Upload/send error', err);
      setError('Failed to upload audio. Try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <div>
        {/* Mic button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            openRecordingModal();
          }}
          className="cursor-pointer bg-[#2A2D33] p-2 rounded-full"
          title="Record voice"
        >
          <Mic size={26} />
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
          onClick={() => {
            if (!isRecording && !isUploading) closeModal();
          }}
        >
          <div
            className="w-full max-w-md bg-[#111214] rounded-lg p-4 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium">Voice Message</h3>
              <button
                onClick={() => {
                  if (isRecording) return;
                  closeModal();
                }}
                className="p-1 rounded hover:bg-white/5"
                title="Close"
              >
                <X />
              </button>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-3">
                {!isRecording ? (
                  <button
                    onClick={startRecording}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-md"
                  >
                    <Mic /> <span>Record</span>
                  </button>
                ) : (
                  <button
                    onClick={stopRecording}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-md"
                  >
                    <StopCircle /> <span>Stop</span>
                  </button>
                )}

                <div className="text-sm">
                  <div className="font-mono">{formatTime(seconds)}</div>
                  <div className="text-xs text-gray-400">
                    {isRecording
                      ? 'Recording…'
                      : recordedBlob
                        ? 'Recorded'
                        : 'Ready'}
                  </div>
                </div>
              </div>

              <div className="w-full h-2 bg-white/5 rounded overflow-hidden">
                <div
                  style={{
                    width: `${Math.min(100, 10 + seconds * 10)}%`,
                    height: '100%',
                    transition: 'width 0.2s linear',
                    background: 'linear-gradient(90deg, #34D399, #06B6D4)',
                  }}
                />
              </div>

              {recordedBlob && audioUrl && (
                <>
                  <audio
                    ref={audioRef}
                    src={audioUrl}
                    controls
                    className="w-full"
                  />
                  <div className="flex gap-2 w-full justify-end">
                    <button
                      onClick={() => {
                        setRecordedBlob(null);
                        if (audioUrl) {
                          URL.revokeObjectURL(audioUrl);
                          setAudioUrl(null);
                        }
                        setSeconds(0);
                      }}
                      disabled={isUploading}
                      className="px-3 py-1 rounded bg-white/5"
                    >
                      Discard
                    </button>

                    <button
                      onClick={handleSendRecording}
                      disabled={isUploading}
                      className="px-3 py-1 rounded bg-[#2A2D33] flex items-center gap-2"
                    >
                      {isUploading ? (
                        'Sending…'
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Send</span>
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}

              {error && <div className="text-sm text-red-400">{error}</div>}

              {!recordedBlob && !isRecording && (
                <div className="text-xs text-gray-400">
                  Press Record to start. Stop to preview and send.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
