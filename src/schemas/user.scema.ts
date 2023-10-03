import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { generateKey } from "crypto"; 
import { Document } from "mongoose";


export enum roles  {
    ADMIN = 'administrator',
    CONTRIBUTOR = 'contributor',
    NGO = 'ngo',
    REGULAR = 'regular_user'
}


@Schema({
    timestamps: true
})


export class User extends Document {
    // @Prop()
    // id: string;
    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    userName: string;
    @Prop({ required: true, unique: true })
    email: string;
    @Prop({ required: true })
    password: string;
    @Prop({ required: true, enum: roles, default: roles.REGULAR})
    type: roles;
    @Prop()
    country: string;
    @Prop()
    gender: string;
    @Prop()
    organization: string;
    @Prop()
    otp: string;
}


export const UserSchema = SchemaFactory.createForClass(User);