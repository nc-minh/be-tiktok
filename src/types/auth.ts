import { JwtPayload } from 'jsonwebtoken';

export interface RefreshTokenPayload extends JwtPayload {
  userID: string;
  role: string;
}
