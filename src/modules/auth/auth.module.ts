import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWT_SECRET_KEY } from 'src/config/constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule, 
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secretOrPrivateKey: configService.get<string>(JWT_SECRET_KEY),
        signOptions: {
            expiresIn: 3600,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy, 
    JwtStrategy
  ],
  controllers: [AuthController],
})
export class AuthModule {}

