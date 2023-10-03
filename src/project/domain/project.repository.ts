import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from 'src/schemas/project.schema';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UserDto } from 'src/auth/dto/user.dto';
import { use } from 'passport';


@Injectable()
export class ProjectRepository {

    constructor(
        @InjectModel(Project.name)
        private projectModel: Model<Project>,

    ){}

    async createProject(project: CreateProjectDto): Promise<Project> {
        const newProject = new this.projectModel(project);
        return await newProject.save();
    }

    async findAllProjects(): Promise<Project[]> {
        return await this.projectModel.find();
    }

    async findOneProject(id: string): Promise<Project> {
        return await this.projectModel.findById(id);
    }

    async updateProject(id: string, project: UpdateProjectDto): Promise<Project> {
        
        return await this.projectModel.findByIdAndUpdate(id, project);
    }
    
    async removeProject(id: string): Promise<Project> {
        return await this.projectModel.findByIdAndDelete(id);
    }

    async deleteProjects(): Promise<any> {
        return await this.projectModel.deleteMany();
    }



    async findUserByEmail(email: string): Promise<Project> {
        const user = await this.projectModel.findOne({email});
         if(!user) {
                throw new UnauthorizedException('User not found');
            }
        return user
    
}

async getUsers(): Promise<any> {
    const users = await this.projectModel.find();
    return users;
}

async signUser(email: string): Promise<any> {
    // return this.jwtService.sign({email});
}

async getUser(id: Number): Promise<any> {
    const user = await this.projectModel.findById(id);
    return user;
}

async updateUser(id: Number, user: UpdateProjectDto): Promise<any> {
    const updatedUser = await this.projectModel.findByIdAndUpdate(id, user);
    return updatedUser;
}

async updateUserPassword(
    userId: string,
    password: string,
  ): Promise<Project> {
    return await this.projectModel.findByIdAndUpdate(userId, { password }, { new: true });
  }
async deleteUser(id: Number): Promise<any> {
    const user = await this.projectModel.findByIdAndDelete(id);
    return user;
}

}