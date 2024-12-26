import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import UserInterface from '../../user.interface';
import { genSalt, hash } from "bcrypt";

@Schema({ timestamps: true })
export class User implements UserInterface {
    @Prop({ required: true })//@todo validate email
    email: string;

    @Prop({ required: true })
    password: string
}

export class UserFound extends User {
    _id: string;
    __v: number;
}

export const UserSchema = SchemaFactory.createForClass(User)
    .index({ email: 1 }, { unique: true })
    .pre("save", function(next){
        const saltRounds = 10;
        genSalt(saltRounds).then((salt) => {
            hash(this.password, salt).then((hash) => {
                this.password = hash;
                next();
            });
        });
    });
