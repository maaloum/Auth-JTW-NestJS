import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.scema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService, ConfigModule } from '@nestjs/config';
import {config} from 'process';
import { AuthRepository } from './domain/auth.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get(<string>'JWT_SECRET'),
          signOptions: { 
            expiresIn: config.get<string>('JWT_EXPIRATION_TIME'),
          },
        };
      },

    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
    // JwtModule.register({
    //   secret: 'secret',}),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository]
})
export class AuthModule {}
