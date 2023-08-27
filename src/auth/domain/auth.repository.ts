import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';



@Injectable()
export class AuthRepository {

    users = [
        {
            "idUser": 1,
            "password": "John Doe",
            "email": "ely cheick@gmail.com",
            "type": "admin"
        },
        {
            "idUser": 2,
            "password": "John Doe",
            "email": "ely@gmail.com",
            "type": "user"

        },
        {
            "idUser": 3,
            "password": "John Doe",
            "email": "doe@gmail.com",
            "type": "user"
        }
]

    async findUserByEmail(email: string): Promise<UserDto> {
        console.log('users', this.users)
       const user: UserDto = this.users.find(user => user.email === email);
         if(!user) {
                throw new UnauthorizedException('User not found');
            }
        return user;
    
}
}