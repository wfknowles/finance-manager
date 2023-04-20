import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from 'nest-router';
import { AuthModule } from './config/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { routes } from './config/routes';
import { PlaidModule } from './modules/plaid/plaid.module';

import { DatabaseModule } from './config/db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RouterModule.forRoutes(routes),
    DatabaseModule,
    AuthModule,
    UsersModule,
    PlaidModule,
  ],
})
export class AppModule {}
