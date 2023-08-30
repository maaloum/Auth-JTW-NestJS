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
    const token = await this.authRepository.signUser(user.email);

    const data = {email: user.email,
        name: user.name,
        token};
    return {data};
    }

    async signUp(signUpDto: SignUpDto ): Promise<any> {

        const {name, email, password, userName, country, gender} = signUpDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new this.userModel({name, email, userName, country, gender, password: hashedPassword});

        // assign jwt token to user
        const token = await this.authRepository.signUser(user.email,);
        await user.save();
        return {user, token};
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
            userFound.id,
            hashedPassword,
        );
        return updatedUser;
    }
    async getUsers(): Promise<any> {
        const users = await this.authRepository.getUsers();
        return users;
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


        const SENDER_EMAIL = "<maaloumali1@gmail.com>";
        const RECIPIENT_EMAIL = email;
        const client = new MailtrapClient({ token: token })
        const sender = { name: "Mailtrap Test", email: SENDER_EMAIL };
        client
        .send({
          from: sender,
          to: [{ email: RECIPIENT_EMAIL }],
          subject: "Hello from Mailtrap!",
          text: "Welcome to Mailtrap Sending!",
        })
        .then(console.log)
        .catch(console.error);
        
        // try {
        //   // 1. Create a transporter with data stored in .env
        //   const transporter = nodemailer.createTransport({
        //     host: "smtp.gmail.com",
        //     port: 587,
        //     auth: {
        //       user: "maaloumali1@gmail.com", // generated ethereal user
        //       pass: "YTsn7R.ZD@E3XMu",
        //     },
        //   });
        //   // 2. Define email options.
        //   const mailOptions = {
        //     from: 'maaloumali1@gmail.com',
        //     to: email,
        //     subject: 'Password Reset ',
        //     text: `Your password reset is: ${token}`,
        //   };
        //   // 3. Send email.
        //   await transporter.sendMail(mailOptions);
        //   // 4. Handle error
        // } catch (error) {
        //     throw new UnauthorizedException('Error sending email');
        // }
      }

    async verifyOtp(otp: string, submittedCode: string,): Promise<boolean> {
        return otp === submittedCode;
    }
    
    async verifyOtpRest(email: string, optCode: string): Promise<object> {
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
