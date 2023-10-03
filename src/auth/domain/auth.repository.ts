import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.scema';
import { ForgotPasswordDto } from '../dto/forgetpassword.dto';
import { loginUpDto } from '../dto/login.dto';



@Injectable()
export class AuthRepository {

    constructor(
        private jwtService: JwtService,
        @InjectModel(User.name)
        private userModel: Model<User>,

    ){}


    async createUser(user: UserDto): Promise<User> {
        const {email} = user;
        const newUser = await this.userModel.findOne({email});
        if(newUser) {
            throw new UnauthorizedException('User already exists');
        }
        const createdUser = new this.userModel(user);
        await createdUser.save();
    return createdUser;
    }

    async findUserByEmail(email: string): Promise<User> {
        const user = await this.userModel.findOne({email});
         if(!user) {
                throw new UnauthorizedException('User not found');
            }
        return user
    
}

async getUsers(): Promise<any> {
    const users = await this.userModel.find();
    return users;
}

async deleteUsers(): Promise<any> {
    const users = await this.userModel.deleteMany();
    return users;
}

async signUser(email: string): Promise<any> {
    return this.jwtService.sign({email});
}

async getUser(id: Number): Promise<any> {
    const user = await this.userModel.findById(id);
    return user;
}

async updateUser(id: Number, user: UserDto): Promise<any> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, user);
    return updatedUser;
}

async updateUserPassword(
    userId: string,
    password: string,
  ): Promise<User> {
    return await this.userModel.findByIdAndUpdate(userId, { password }, { new: true });
  }
async deleteUser(id: Number): Promise<any> {
    const user = await this.userModel.findByIdAndDelete(id);
    return user;
}

}