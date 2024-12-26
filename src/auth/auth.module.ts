import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './auth.strategy';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
	imports: [
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '3600s' }, //@todo, set to env var
		}),
		UserModule
	],
    providers: [AuthResolver, AuthService, JwtStrategy],
	exports: [JwtStrategy, JwtModule]
})
export class AuthModule {}
