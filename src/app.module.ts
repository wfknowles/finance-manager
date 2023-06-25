import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from 'nest-router';
import { AuthModule } from './config/auth/auth.module';

import { routes } from './config/routes';

import { DatabaseModule } from './config/db/db.module';
import { UserModule } from './modules/user/user.module';
import { AccountModule } from './modules/account/account.module';
import { BudgetModule } from './modules/budget/budget.module';
import { ConcernModule } from './modules/concern/concern.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { BudgetItemModule } from './modules/budget-item/budget-item.module';

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
    BudgetModule,
    BudgetItemModule,
    ConcernModule,
    TransactionModule,
  ],
})
export class AppModule {}
