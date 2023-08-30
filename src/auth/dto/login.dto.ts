import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class loginUpDto{
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email format' })
    @IsString()
    readonly email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @IsString()
    readonly password: string;
} 