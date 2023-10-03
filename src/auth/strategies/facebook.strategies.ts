// import { configService } from '../config/config.service';
// import { JwtService } from '@nestjs/jwt';
// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from "@nestjs/passport";
// import { Profile, Strategy, VerifyCallback } from "passport-facebook";
// import { AuthService } from 'src/auth/auth.service';




// @Injectable()
// export class FacebookStrategy extends PassportStrategy(Strategy, "facebook") {
//   constructor(
//     private readonly authService: AuthService,

//   ) {
//     super({
        
//       clientID: configService.getValue("APP_ID"),
//       clientSecret: configService.getValue("APP_SECRET"),
//       callbackURL: configService.getValue("FB_CALLBACK_URL"),
//       passReqToCallback: true,
//       scope: "email",
//       profileFields: ["id", "name", "emails"],
//     });
//   }

//   async validate(
//     request: any,
//     accessToken: string,
//     refreshToken: string,
//     profile: any,
//     done: VerifyCallback,
//   ): Promise<any> {
//     console.log("Facebook Profile:", profile);
//     const { name, emails } = profile;
//     console.log('name', name);
//     const user = await this.authService.saveUser({
//         firstName: profile._json.name ?? name.givenName,
//         lastName: profile._json.family_name ?? name.familyName, 
//         userName: profile._json.email?? emails[0].value,
//         provider: 'facebook',
//         email: profile._json.emai ?? emails[0].value,
//     });
//     const tokens = await this.authService.generateTokens(user);
//     done(null, {
//         ...tokens,
//     });
//   }
// }




//  @Get('facebook')
//   @UseGuards(AuthGuard('facebook'))
//   async facebookAuth(@Req() req) {
//     return req.user;
//   }

//   @Get('facebook/callback')
//   @UseGuards(AuthGuard('facebook'))
//   async facebookAuthRedirect(@Req() req) {
//     return req.user;
//   }



//   env

  
// ACCESS_TOKEN_SECRET = maaloumkjjdnhs@13425#_37s
// ACCESS_TOKEN_EXPIRES_TIMEOUT = 3600000

// APP_ID=661443009055031
// APP_SECRET=baefd623b96c303b2a61dd1fafaae39a
// FB_CALLBACK_URL=http://localhost:3001/authentication/facebook/callback


// GOOGLE_CLIENT_ID = 6614430023055031
// GOOGLE_CLIENT_SECRET = c3652edd7efe6b58b711feea1293770b
// GOOGLE_CALLBACK_URL = http://localhost:3001/api/v1/auth/google/callback




//    FacebookStrategy,

//    import { FacebookStrategy } from 'src/shared/strategy/facebook.statery';