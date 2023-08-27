import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { AuthRepository } from './domain/auth.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private authRepository: AuthRepository,
        private jwtService: JwtService

    ) {}
    async login(dto: UserDto): Promise<any> {
       const user  =  this.authRepository.findUserByEmail(dto.email);
       if((await user).password !== dto.password) {
           throw new UnauthorizedException('Password is incorrect');
       }
         return this.signUser((await user).idUser, (await user).email, (await user).type);
    }

    async signUser(idUser: Number, email: string, type:string): Promise<any> {
        return this.jwtService.sign({idUser, email, type});
    }

    async signUp(user: UserDto): Promise<any> {
        
    }
    async test(user: UserDto): Promise<any> {
        return " Test route";
    }
}
