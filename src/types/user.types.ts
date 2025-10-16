export interface IUser {
  id: string;
  email: string;
  phone: string | null;
  username: string;
  name: string;
  avatarUrl: string;
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
  signUpMethod: 'EMAIL' | 'GOOGLE' | 'GITHUB' | 'FACEBOOK';
  isVerified: boolean;
  isLoggedIn: boolean;
  isTwoFAEnabled: boolean;
  twoFAMethod: 'SMS' | 'EMAIL' | 'AUTH_APP' | null;
  createdAt: string;
  updatedAt: string;
}

export enum AuthProvider {
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
  TWITTER = 'TWITTER',
  INSTAGRAM = 'INSTAGRAM',
  LINKEDIN = 'LINKEDIN',
  GITHUB = 'GITHUB',
  APPLE = 'APPLE',
  TIKTOK = 'TIKTOK',
}
