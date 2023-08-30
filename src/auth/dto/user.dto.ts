import { IsNotEmpty, IsString } from "class-validator";

export class UserDto {
    readonly id: string;
    readonly email: string;
    @IsNotEmpty({ message: 'Password is required' })
    @IsString()
    readonly password: string;
    readonly type: string;
}