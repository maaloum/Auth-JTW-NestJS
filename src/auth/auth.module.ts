import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.scema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService, ConfigModule } from '@nestjs/config';
require("dotenv").config();
import { AuthRepository } from './domain/auth.repository';
import { MailerModule } from '@nestjs-modules/mailer';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get(<string>'JWT_SECRET'),
          // signOptions: { 
          //   expiresIn: config.get<string>('JWT_EXPIRATION_TIME'),
          // },
        };
      },

    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        // port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: 'maaloumali1@gmail.com',
          pass: 'YTsn7R.ZD@E3XMu',
        },
      },}),
// or new PugAdapter() or new EjsAdapter()

    // JwtModule.register({
    //   secret: 'secret',}),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
