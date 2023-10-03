import { Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { AuthRepository } from './domain/auth.repository';
import {User} from '../schemas/user.scema';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpDto } from './dto/signUp.dto';
import * as bcrypt from 'bcryptjs';
import { loginUpDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgetpassword.dto';
import * as nodemailer from 'nodemailer';
import { ExecutableBase } from 'mysql2/typings/mysql/lib/protocol/sequences/promise/ExecutableBase';
const otpGenerator = require('otp-generator')
import { MailtrapClient } from "mailtrap"
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
    saveUser(arg0: { firstName: any; lastName: any; userName: any; provider: string; email: any; }) {
      throw new Error('Method not implemented.');
    }
    generateTokens(user: any) {
      throw new Error('Method not implemented.');
    }

    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private authRepository: AuthRepository,
        private jwtService: JwtService,
        private mailService: MailerService,

    ) {}
    async login(dto: loginUpDto): Promise<any> {
    const {email, password} = dto;
    const user = await this.authRepository.findUserByEmail(email);
    if(!user) {
        throw new UnauthorizedException('User not found');
    }
    if(!await bcrypt.compare(password, user.password)) {
        throw new UnauthorizedException('Password is incorrect');
    }
    const token = await this.authRepository.signUser(user._id);

    const data = {email: user.email,
        name: user.name,
        token};
    return {data};
    }

    async signUp(signUpDto: SignUpDto ): Promise<any> {

        const hashedPassword = await bcrypt.hash(signUpDto.password, 10);
        const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
        console.log('otp', otp);
        await this.sendEmailWithToken(signUpDto.email, otp);
        const user = await this.authRepository.createUser({
            ...signUpDto,
            password: hashedPassword,
            otp,
        });
        return {user};
    }

    async forgetPassword(email: string): Promise<any> {
        const userFound = await this.authRepository.findUserByEmail(email);
        if(!userFound) {
            throw new UnauthorizedException('User not found');
        }

        const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
        console.log('otp', otp);
        const token = await this.authRepository.signUser(userFound.email);
        await this.sendEmailWithToken(email, otp);

        return {token};
    }

    async resetPassword(user: loginUpDto): Promise<any> {
        const {email, password} = user;
        const userFound = await this.authRepository.findUserByEmail(email);
        if(!userFound) {
            throw new UnauthorizedException('User not found');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedUser = await this.authRepository.updateUserPassword(
            userFound._id,
            hashedPassword,
        );
        return updatedUser;
    }
    async getUsers(): Promise<any> {
        const users = await this.authRepository.getUsers();
        return users;
    }

    async deleteUsers(): Promise<any> {
        const users = await this.authRepository.deleteUsers();
        return {
            "status": 200,
            message: 'Users deleted successfully',
        };
    }

    async getUser(id: Number): Promise<any> {
        const user = this.authRepository.getUser(id);
        return user;
    }

    async updateUser(id: Number, user: UserDto): Promise<any> {
        const updatedUser = await this.authRepository.updateUser(id, user);
        return updatedUser;
    }

    async deleteUser(id: Number): Promise<any> {
        const user = await this.authRepository.deleteUser(id);
        return {
            "status": 200,
            message: 'User deleted successfully',
        };
    }


    async sendEmailWithToken(email: string, token: string): Promise<void> {

        console.log("email", email)

        try {
            // 1. Create a transporter with data stored in .env
            const transporter = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD,
                }});
            // 2. Define email options.
            const mailOptions = {
                from: "UBUNTO-AI",
                to: email,
                subject: 'Registration Token',
                text: `Kindly enter the token: ${token}`,
            };

            // 3. Send email.
            await transporter.sendMail(mailOptions);
        } catch (error) {
            // Handle error
            console.log("error", error)
            throw new UnauthorizedException('Error sending email');
        }
    }


    async verifyOtp(otp: string, submittedCode: string,): Promise<boolean> {
        return otp === submittedCode;
    }
    
    async verifyOtpCode(email: string, optCode: string): Promise<object> {
        const user = await this.authRepository.findUserByEmail(email);
        if (!user) {
          throw new UnauthorizedException('User not found', undefined);
        }
    
        const isOtpValid = this.verifyOtp(
          optCode,
          user.otp,
        );
        if (!isOtpValid) {
          throw new UnauthorizedException('Invalid OTP code');
        }
        return {
            message: 'OTP code is valid',
            "email" : user.email,
        };
      }
    async test(user: UserDto): Promise<any> {
        return "this route is protected";
    }
}
