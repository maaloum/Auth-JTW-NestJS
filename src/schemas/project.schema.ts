import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { generateKey } from "crypto";
import mongoose from "mongoose";
import { User } from "./user.scema";

@Schema({
    timestamps: true
})


export class Project {
    @Prop({ required: true })
    title: string;
    @Prop({ required: true })
    description: string;
    @Prop({ required: true })
    image: string;
    @Prop({ required: true})
    main_link: string;
    @Prop({ required: true})
    organization: string;
    @Prop({ required: true})
    projectType: string;
    @Prop({ required: true})
    isSeen: boolean;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;
}


export const ProjectSchema = SchemaFactory.createForClass(Project);