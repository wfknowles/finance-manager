import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from 'nest-router';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { routes } from './config/routes';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }), 
    RouterModule.forRoutes(routes), 
    AuthModule, 
    UsersModule
  ],
})
export class AppModule {}
