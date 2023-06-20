import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class WebsocketAuthJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const client = context.switchToWs().getClient();
    const handshake = client.handshake; // ดึงคำขอเข้าถึงของ Socket.IO
    const auth = handshake.headers.authorization;
    let token: string;

    if (auth) {
      token = this.extractTokenFromHeader(auth);  // รับ JWT จาก query parameter (แก้ไขตามวิธีที่คุณส่ง JWT)
    } else {
      throw new WsException('Invalid token.');
    }
    try {
      const payload = this.jwtService.verify(token); // ตรวจสอบและยืนยัน JWT
      handshake.user = payload; // จัดเก็บข้อมูลผู้ใช้ในคำขอเข้าถึง

      return true;
    } catch (error) {
      throw new WsException('Invalid token.');
    }
  }

  async verify(token: any, isWs: boolean = false) {
    let tokenAuth = token
    if (tokenAuth) {
      tokenAuth = this.extractTokenFromHeader(token);  // รับ JWT จาก query parameter (แก้ไขตามวิธีที่คุณส่ง JWT)
    } else {
      return null
    }
    try {
      const payload = this.jwtService.verify(tokenAuth);
      const user = payload
      if (!user) {
        return null
      }

      return user;
    } catch (err) {
      return null
    }
  }

  private extractTokenFromHeader(authorization: any): string | undefined {
    const [type, token] = authorization.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
