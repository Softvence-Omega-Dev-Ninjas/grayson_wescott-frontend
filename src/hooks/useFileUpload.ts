/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useCallback, useState } from 'react';

export function useFileUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadedData, setUploadedData] = useState<any>(null);

  const uploadFiles = useCallback(async (formData: FormData, token: string) => {
    setUploading(true);
    setError(null);
    setProgress(0);

    try {
      const files = formData.getAll('files') as File[];
      if (!files || files.length === 0) throw new Error('No files provided');
      if (files.length > 5)
        throw new Error('You can upload a maximum of 5 files');

      const backendForm = new FormData();
      files.forEach((file) => backendForm.append('files', file));

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/files`,
        {
          method: 'POST',
          body: backendForm,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Upload failed: ${errText}`);
      }

      const data = await response.json();
      setUploadedData(data?.data?.files);
      setProgress(100);
      return data?.data?.files;
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Failed to upload files');
      throw err;
    } finally {
      setUploading(false);
    }
  }, []);

  return { uploadFiles, uploading, progress, error, uploadedData };
}
