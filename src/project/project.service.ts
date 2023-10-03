import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectRepository } from './domain/project.repository';
import { User } from 'src/schemas/user.scema';
import { UserDto } from 'src/auth/dto/user.dto';

@Injectable()
export class ProjectService {

  constructor(
    private projectRepository: ProjectRepository,
  ){}

  async create(createProjectDto: CreateProjectDto, user: UserDto) {
    const data = Object.assign(createProjectDto, {user: user});
    return  await this.projectRepository.createProject(data);
  }

  async findAllProjects() {
    return await this.projectRepository.findAllProjects();
  }


  async findOneProject(id: string) {
    return await this.projectRepository.findOneProject(id);
  }

  async updateProject(id: string, updateProjectDto: UpdateProjectDto) {
    return await this.projectRepository.updateProject(id, updateProjectDto);
  }

  async removeProject(id: string) {
    return await this.projectRepository.removeProject(id);
  }

  async deleteProjects() {
    return await this.projectRepository.deleteProjects();
  }

}
