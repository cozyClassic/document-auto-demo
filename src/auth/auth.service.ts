import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pwd: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user?.password !== pwd) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, id: user.id, role: user.role };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
