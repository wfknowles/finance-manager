import { Routes } from 'nest-router';
import { AccountModule } from 'src/modules/account/account.module';
import { PlaidModule } from 'src/modules/plaid/plaid.module';
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
        path: 'plaid',
        module: PlaidModule,
      },
      {
        path: 'accounts',
        module: AccountModule,
      },
      {
        path: 'users',
        module: UserModule,
      },
    ],
  },
];
