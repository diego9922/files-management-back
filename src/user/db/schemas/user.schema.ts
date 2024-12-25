import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import UserInterface from '../../user.interface';

@Schema({ timestamps: true })
export class User implements UserInterface {
    @Prop({ required: true })//@todo validate email
    email: string;

    @Prop({ required: true })
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User)
    .index({ email: 1 }, { unique: true })
    .pre("save", function(next){
        this.password = "xxx";//@todo hash password
        next()
    });
