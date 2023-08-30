import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class restPasswordDto {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    otpCode: string;
  }