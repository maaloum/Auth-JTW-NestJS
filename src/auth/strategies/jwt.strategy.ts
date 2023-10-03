import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "src/schemas/user.scema";




@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)  {

    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        

    ) {
        console.log("Initializing JwtStrategy");
        super(

            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: process.env.JWT_SECRET,

            }
        );
    }


    async validate(payload: any) {

        const {email} = payload;

        const user = await this.userModel.findById(email);

        

        if(!user) {
            throw new UnauthorizedException('User is not authorized');
        }
        
        return user;
    }

}
