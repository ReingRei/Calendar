import { Controller, Post, Request, UseGuards, Body, Response } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";
import { CreateUserDto } from "src/common/dto";

@Controller()
export class AuthController {
    constructor(private _authService: AuthService, private _userService: UserService) { }

    // @Post('register')
    // async register(@Body() payload: CreateUserDto): Promise<{ access_token: string }> {
    //     const user = await this._userService.createUser(createUserDto);
    //     return token;
    // }

    @Post('login')
    @UseGuards(AuthGuard('local'))
    async login(@Request() req, @Response() res): Promise<{ access_token: string }> {
        // res
        //     .set({ Authorization: 'Bearer ' + resultado.access_token })
        //     .json(resultado);
        return this._authService.login(req.user);
    }
}