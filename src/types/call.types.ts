/**
 * Frontend Types for Call and WebRTC Services
 * These types mirror the backend DTOs for type-safe API communication
 */

// ==================== Enums ====================

/**
 * Type of call (audio or video)
 */
export enum CallType {
  AUDIO = 'AUDIO',
  VIDEO = 'VIDEO',
}

/**
 * Status of a call
 */
export enum CallStatus {
  INITIATED = 'INITIATED',
  ONGOING = 'ONGOING',
  ENDED = 'ENDED',
  MISSED = 'MISSED',
}

/**
 * Status of a participant in a call
 */
export enum CallParticipantStatus {
  JOINED = 'JOINED',
  MISSED = 'MISSED',
  LEFT = 'LEFT',
}

// ==================== Call DTOs ====================

/**
 * Initiate a new call
 * Used by admins to start a call with a user in a conversation
 */
export type InitiateCallDto = {
  conversationId: string;
  type: CallType;
};

/**
 * Perform actions on an existing call (accept, reject, end)
 */
export type CallActionDto = {
  callId: string;
};

// ==================== WebRTC DTOs ====================

/**
 * WebRTC SDP Offer
 * Contains the Session Description Protocol offer for establishing peer connection
 */
export type RTCOfferDto = {
  callId: string;
  sdp: string;
  to: string;
  from?: string;
};

/**
 * WebRTC SDP Answer
 * Contains the Session Description Protocol answer in response to an offer
 */
export type RTCAnswerDto = {
  callId: string;
  sdp: string;
  to: string;
  from?: string;
};

/**
 * WebRTC ICE Candidate
 * Contains Interactive Connectivity Establishment candidate information
 * for NAT traversal and connection establishment
 */
export type RTCIceCandidateDto = {
  callId: string;
  candidate: string;
  sdpMid: string;
  sdpMLineIndex: number;
  to: string;
  from?: string;
};

// ==================== Response Types ====================

/**
 * Call participant information
 */
export type CallParticipant = {
  id: string;
  callId: string;
  userId: string;
  status: CallParticipantStatus;
  joinedAt?: Date | string;
  leftAt?: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

/**
 * Complete call information
 */
export type Call = {
  id: string;
  conversationId: string;
  initiatorId: string;
  type: CallType;
  status: CallStatus;
  startedAt?: Date | string;
  endedAt?: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
  participants: CallParticipant[];
};

/**
 * Response from initiating a call
 */
export type InitiateCallResponse = {
  call: Call;
  from: string;
};

/**
 * Response from accepting a call
 */
export type AcceptCallResponse = {
  callId: string;
  userId: string;
};

/**
 * Response from rejecting a call
 */
export type RejectCallResponse = {
  callId: string;
  userId: string;
};

/**
 * Response when call is missed
 */
export type MissedCallResponse = {
  callId: string;
  by: string;
};

/**
 * Response from ending a call
 */
export type EndCallResponse = {
  callId: string;
};

/**
 * Incoming call notification payload
 */
export type IncomingCallPayload = {
  call: Call;
  from: string;
};

/**
 * RTC Offer event payload
 */
export type RTCOfferPayload = {
  callId: string;
  sdp: string;
  from: string;
};

/**
 * RTC Answer event payload
 */
export type RTCAnswerPayload = {
  callId: string;
  sdp: string;
  from: string;
};

/**
 * RTC ICE Candidate event payload
 */
export type RTCIceCandidatePayload = {
  callId: string;
  candidate: string;
  sdpMid: string;
  sdpMLineIndex: number;
  from: string;
};

// ==================== Socket Event Names ====================

/**
 * Socket event names for call operations
 */
export const CallEvents = {
  // Client to Server
  INITIATE_CALL: 'call:initiate',
  ACCEPT_CALL: 'call:accept',
  REJECT_CALL: 'call:reject',
  END_CALL: 'call:end',

  // Server to Client
  CALL_INCOMING: 'call:incoming',
  CALL_ACCEPT: 'call:accepted',
  CALL_MISSED: 'call:missed',
  CALL_END: 'call:ended',
} as const;

/**
 * Socket event names for WebRTC signaling
 */
export const WebRTCEvents = {
  // Client to Server
  SEND_OFFER: 'rtc:offer:send',
  SEND_ANSWER: 'rtc:answer:send',
  SEND_ICE_CANDIDATE: 'rtc:ice-candidate:send',

  // Server to Client
  RTC_OFFER: 'rtc:offer',
  RTC_ANSWER: 'rtc:answer',
  RTC_ICE_CANDIDATE: 'rtc:ice-candidate',
} as const;

// ==================== Utility Types ====================

/**
 * Generic API response wrapper
 */
export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message: string;
};

/**
 * WebRTC connection state
 */
export type RTCConnectionState =
  | 'new'
  | 'connecting'
  | 'connected'
  | 'disconnected'
  | 'failed'
  | 'closed';

/**
 * Call UI state for managing call interface
 */
export type CallUIState = {
  callId: string | null;
  status: CallStatus | null;
  type: CallType | null;
  isIncoming: boolean;
  isOutgoing: boolean;
  remoteUserId: string | null;
  connectionState: RTCConnectionState;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  isMuted: boolean;
  isVideoEnabled: boolean;
};
