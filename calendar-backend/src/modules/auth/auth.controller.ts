import { Controller, Post, Request, UseGuards, Body, Response } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/common/dto";

@Controller('auth')
export class AuthController {
    constructor(private _authService: AuthService) { }

    @Post('register')
    async register(@Body() payload: CreateUserDto, @Response() res): Promise<{ accessToken: string }> {
        console.log(payload)
        const result = await this._authService.registerUser(payload);
        res
            .set({ Authorization: 'Bearer ' + result.accessToken })
            .json(result);
        return result;
    }

    @Post('login')
    @UseGuards(AuthGuard('local'))
    async login(@Request() req, @Response() res): Promise<{ accessToken: string }> {
        const result = await this._authService.login(req.user);
        res
            .set({ Authorization: 'Bearer ' + result.accessToken })
            .json(result);
        return result;
    }
}