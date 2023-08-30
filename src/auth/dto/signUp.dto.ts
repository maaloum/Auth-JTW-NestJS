import { isEmail, isNotEmpty } from 'class-validator';

export enum roles  {
    ADMIN = 'administrator',
    PROJECTMANAGER = 'project_manager',
    USER = 'regular_user'
}

export class SignUpDto{

    readonly name: string;
    readonly userName: string;
    readonly email: string;
    readonly password: string;
    readonly country: string;
    readonly gender: string;
    readonly type: roles;
} 