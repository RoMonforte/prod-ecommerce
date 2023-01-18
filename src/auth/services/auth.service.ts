import { Injectable} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


import { UsersService } from 'src/users/services/users.service';
import { LoginDto } from "../dtos/auth.dto";
import { User } from 'src/users/entities/user.entity';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(data: LoginDto) {
    const user = await this.usersService.findByUsername(data.username);
    if (user) {
      const isMatch = await bcrypt.compare(data.password, user.password);
      if(isMatch) {
        return user;
      }
    }
    return null;
  }

  generateJwt(user: User) {
    const payload: PayloadToken = { role: user.role, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
