import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { generateKey } from "crypto";


export enum roles  {
    ADMIN = 'administrator',
    PROJECTMANAGER = 'project_manager',
    USER = 'regular_user'
}


@Schema({
    timestamps: true
})


export class User {
    @Prop( { required: true, default: generateKey} )
    id: string;
    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    userName: string;
    @Prop({ required: true, unique: true })
    email: string;
    @Prop({ required: true })
    password: string;
    @Prop({ required: true, enum: roles, default: roles.USER})
    type: roles;
    @Prop({ required: true})
    country: string;
    @Prop({ required: true})
    gender: string;
    @Prop()
    otp: string;
}


export const UserSchema = SchemaFactory.createForClass(User);