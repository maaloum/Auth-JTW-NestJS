
import { Controller, Post, Body, Get,  UseGuards, Param, Delete, Put, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from './auth.guard';
import { Sign } from 'crypto';
import { SignUpDto } from './dto/signUp.dto';
import { loginUpDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgetpassword.dto';
import { restPasswordDto } from './dto/restpassword.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        
    ) {}

    @Post('login')
    async login(@Body() loginUpDto: loginUpDto): Promise<any> {
        return this.authService.login(loginUpDto);
    }

    @Post('signup')
    async signUp(@Body() SignUpDto: SignUpDto): Promise<{token:string}>{
        return this.authService.signUp(SignUpDto);
    }

    @Post('forget-password')
    async forgetPassword(@Body() user: loginUpDto): Promise<any> {
        return this.authService.forgetPassword(user.email);
    }

    @Post('reset-password')
    async resetPassword(@Body() user: loginUpDto): Promise<any> {
        return this.authService.resetPassword(user);
    }


    @Get('users')
    async getUsers(): Promise<any> {
        return this.authService.getUsers();
    }

    @Delete('users')
    async deleteUsers(): Promise<any> {
        return this.authService.deleteUsers();
    }


    @Get('users/:id')
    async getUser(@Param('id') id: Number): Promise<any> {
        return this.authService.getUser(id);
    }

    @Put('users/:id')
    async updateUser(@Param('id') id: Number, @Body() user: UserDto): Promise<any> {
        return this.authService.updateUser(id, user);
    }

    @Delete('users/:id')
    async deleteUser(@Param('id') id: Number): Promise<any> {
        return this.authService.deleteUser(id);
    }

    @Get('test')
    @UseGuards(AuthGuard)
    async test(@Body() user: UserDto, @Req() req: any): Promise<any>{

        console.log(req.user)
        return this.authService.test(user);
    }

    @Get('verify-otp')
    @UseGuards(AuthGuard) // Protect the route with JWT authentication
    async verifyOTP(@Body() loginDto: restPasswordDto) {
      return await this.authService.verifyOtpCode(
        loginDto.email,
        loginDto.otpCode,
      );
    }
  }









