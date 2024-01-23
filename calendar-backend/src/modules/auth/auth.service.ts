import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import * as bcrypt from 'bcrypt';
import { UserEntity } from "src/entitys/user.entity";
import { JwtAuthService } from "./jwt.service";

@Injectable()
export class AuthService {
    constructor(private _userService: UserService, private _jwtService: JwtAuthService) {}

  async validateUser(username: string, password: string): Promise<UserEntity | null> {
    const user = await this._userService.findByEmail(username);

    if (user && await this.comparePasswords(password, user.password)) {
      return user;
    }

    return null;
  }

  async comparePasswords(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }

  async login(user: UserEntity): Promise<{ access_token: string }> {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: await this._jwtService.signPayload(payload),
    };
  }
}