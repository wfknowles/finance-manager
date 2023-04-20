import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from 'nest-router';
import { AuthModule } from './config/auth/auth.module';

import { routes } from './config/routes';

import { DatabaseModule } from './config/db/db.module';
import { UserModule } from './modules/user/user.module';
import { AccountModule } from './modules/account/account.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RouterModule.forRoutes(routes),
    DatabaseModule,
    AuthModule,
    AccountModule,
    UserModule,
    // PlaidModule,
  ],
})
export class AppModule {}
