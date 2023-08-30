import { IsNotEmpty, IsEmail, IsString } from "class-validator";

export class ForgotPasswordDto {
    // @IsNotEmpty({ message: 'Email is required' })
    // @IsEmail({}, { message: 'Invalid email format' })
    // @IsString()
    email: string;
    password: string;
  }
  