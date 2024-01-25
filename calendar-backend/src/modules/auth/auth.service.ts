import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import * as bcrypt from 'bcrypt';
import { UserEntity } from "src/entitys/user.entity";
import { CreateUserDto } from "src/common/dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private _userService: UserService, private _jwtService: JwtService) { }

  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this._userService.findByEmailOrPhone(email);

    if (user && await this.comparePasswords(password, user.password)) {
      return true;
    }

    return false;
  }

  async comparePasswords(textPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(textPassword, hashedPassword);
  }

  async login(user: UserEntity): Promise<{ accessToken: string }> {
    if (await this.validateUser(user.email, user.password)) {
      return this._getAccesToken(user);
    }
    throw new UnauthorizedException('Login incorreto.')
  }

  private _getAccesToken(user: UserEntity): any {
    const payload = { name: user.name, sub: user.id };
    return {
      accessToken: payload,
      // accessToken: this._jwtService.sign(payload),
    };
  }

  async registerUser(payload: CreateUserDto): Promise<{ accessToken: string }> {
    const user = await this._userService.createUser(payload);
    return this._getAccesToken(user);
  }
}