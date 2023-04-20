import { Routes } from 'nest-router';
import { PlaidModule } from 'src/modules/plaid/plaid.module';
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
    ],
  },
];
