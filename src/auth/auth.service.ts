import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { TokePayloadInterface } from './auth.interface';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async execute(email: string, password: string): Promise<string|null>
    {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            return null;
        }
        const isValidPassword = await compare(password, user.password);
        if (!isValidPassword) {
            return null;
        }
        const payload:TokePayloadInterface = { _id: user._id };
        return this.jwtService.sign(payload);
    }
}
