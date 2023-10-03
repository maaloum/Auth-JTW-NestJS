import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
 async create(@Body() createProjectDto: CreateProjectDto,
    @Req() req: any
  ) {

    console.log(req.user)
    return await this.projectService.create(createProjectDto, req.user);
  }

  @Get()
  async findAllProjects() {
    return await this.projectService.findAllProjects();
  }

  @Get(':id')
  async findOneProject(@Param('id') id: string) {
    console.log('id', typeof id)
    return await this.projectService.findOneProject(id);
  }

  @Patch(':id')
  async updateProject(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return await this.projectService.updateProject(id, updateProjectDto);
  }

  @Delete(':id')
  async removeProject(@Param('id') id: string) {
    return await this.projectService.removeProject(id);
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  async deleteProjects() {
    return await this.projectService.deleteProjects();
  }

}
