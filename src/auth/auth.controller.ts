
import { Controller, Post, Body, Get,  UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        // private authService: AuthService,
        private authService: AuthService,
        
    ) {}

    @Post('login')
    async login(@Body() user: UserDto): Promise<any> {
        return this.authService.login(user);
    }

    @Post('signup')
    async sugnUp(@Body() user: UserDto): Promise<any>{
        return this.authService.signUp(user);
    }

    @Get('test')
    @UseGuards(AuthGuard)
    async test(@Body() user: UserDto): Promise<any>{
        return this.authService.test(user);
    }

}







