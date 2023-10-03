import {IsEmpty, IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/schemas/user.scema';

export class CreateProjectDto {

    @IsString()
    @IsNotEmpty({
        message: 'Title is required'
    })
    readonly title: string;
    @IsString()
    @IsNotEmpty({
        message: 'Description is required'
    })
    readonly description: string;
    @IsString()
    @IsNotEmpty()
    image: string;
    @IsString()
    @IsNotEmpty(
        {
            message: 'Main link is required'
        }
    )
    readonly main_link: string;
    @IsString()
    @IsNotEmpty(
        {
            message: 'Organization is required'
        }
    )
    readonly organization: string;
    @IsNotEmpty()
    isSeen: boolean;

    @IsEmpty(
        {message: 'You cannot pass user id'}
    )
    readonly user: User;

}
