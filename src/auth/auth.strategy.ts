import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
import { User, UserFound } from 'src/user/db/schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userService:UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate(payload: any): Promise<UserFound>
    {
        let user = await this.userService.findById(payload._id);
        if (!user || !payload) {
            throw new UnauthorizedException();
        }
        user.password = "";//@todo, return without this property
        return user;
    }
}
