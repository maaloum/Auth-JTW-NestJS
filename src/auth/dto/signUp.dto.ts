import { isEmail, isNotEmpty } from 'class-validator';

export enum roles  {
    ADMIN = 'administrator',
    CONTRIBUTOR = 'contributor',
    NGO = 'ngo',
    REGULAR = 'regular_user'
}

export class SignUpDto{
    readonly name: string;
    readonly userName: string;
    readonly organization: string;
    readonly email: string;
    readonly password: string;
    readonly country: string;
    readonly gender: string;
    readonly type: roles;
} 