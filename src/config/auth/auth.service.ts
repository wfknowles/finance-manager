import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/modules/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne({
      where: {
        username,
      },
      relations: ['account'],
    });

    if (!user || !user.password) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const { password, ...result } = user;

    return result;
  }

  async login(user: UserEntity) {
    const { id, firstName, lastName, username, account } = user;
    const payload = {
      user: {
        id,
        firstName,
        lastName,
        username,
        accountId: account.id,
      },
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
