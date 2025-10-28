import { UserRole } from './user.types';

export enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  FILE = 'FILE',
}

export enum ChatMessageType {
  MESSAGE = 'MESSAGE',
  CALL = 'CALL',
}

export interface Sender {
  id: string;
  name: string;
  avatarUrl: string | null;
  role: UserRole;
  email: string;
}

export interface FileAttachment {
  id: string;
  url: string;
  type: string;
  mimeType: string;
}

export interface ChatMessage {
  id: string;
  type: ChatMessageType.MESSAGE;
  createdAt: string; // ISO string
  content: string;
  messageType: MessageType;
  sender: Sender;
  file: FileAttachment | null;
  isMine: boolean;
  isSentByClient: boolean;
}

// ---- Calls ----

export interface CallParticipant {
  id: string;
  name: string;
  status: string;
  joinedAt: string | null;
  leftAt: string | null;
}

export interface ChatCall {
  id: string;
  type: ChatMessageType.CALL;
  createdAt: string;
  callType: string;
  status: string;
  startedAt: string;
  endedAt: string | null;
  initiatorId: string;
  participants: CallParticipant[];
  isMine: boolean;
  isSentByClient: boolean;
}

// ---- Combined Conversation ----

export type ChatItem = ChatMessage | ChatCall;

export interface ConversationResponse {
  success: boolean;
  message: string;
  data: ChatItem[];
  metadata: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export interface SendMessageResponse {
  success: boolean;
  message: string;
  data: {
    conversationId: string;
    message: ChatMessage;
  };
}
