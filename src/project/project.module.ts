import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectRepository } from './domain/project.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from 'src/schemas/project.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService, ConfigModule } from '@nestjs/config';
require("dotenv").config();
import { MailerModule } from '@nestjs-modules/mailer';
import { Project } from 'src/schemas/project.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ProjectController],
  imports: [
    MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }]),
    AuthModule,
  ],
  providers: [ProjectService, ProjectRepository],
})
export class ProjectModule {}
