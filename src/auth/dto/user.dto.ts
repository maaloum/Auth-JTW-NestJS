import { IsNotEmpty, IsString } from "class-validator";

export class UserDto {
    readonly email: string;
    @IsNotEmpty({ message: 'Password is required' })
    @IsString()
    readonly password: string;
    readonly type: string;
    readonly name: string;
    readonly userName: string;
    readonly organization: string;
    readonly country: string;
    readonly gender: string;
    readonly otp: string;
}