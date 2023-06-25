import { Routes } from 'nest-router';
import { AccountModule } from 'src/modules/account/account.module';
import { BudgetItemModule } from 'src/modules/budget-item/budget-item.module';
import { BudgetModule } from 'src/modules/budget/budget.module';
import { ConcernModule } from 'src/modules/concern/concern.module';
import { TransactionModule } from 'src/modules/transaction/transaction.module';
import { UserModule } from 'src/modules/user/user.module';
import { AuthModule } from './auth/auth.module';

export const routes: Routes = [
  {
    path: 'api',
    children: [
      {
        path: 'auth',
        module: AuthModule,
      },
      {
        path: 'accounts',
        module: AccountModule,
      },
      {
        path: 'budgets',
        module: BudgetModule,
        children: [
          {
            path: ':budgetId/items',
            module: BudgetItemModule,
          },
        ],
      },
      {
        path: 'concerns',
        module: ConcernModule,
      },
      {
        path: 'transactions',
        module: TransactionModule,
      },
      {
        path: 'users',
        module: UserModule,
      },
    ],
  },
];
