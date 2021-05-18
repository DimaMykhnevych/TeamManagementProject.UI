import { IUserInfo } from './UserInfo';

export interface AuthResponse {
  isAuthorized: boolean;
  token: string;
  userInfo: IUserInfo;
}
