import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [ MongooseModule.forRoot('mongodb://localhost:27017/authenticate'), AuthModule, ProjectModule,

],
})
export class AppModule {}
