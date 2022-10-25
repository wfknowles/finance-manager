import { Routes } from 'nest-router';
<<<<<<< HEAD
import { PlaidModule } from 'src/modules/plaid/plaid.module';
import { AuthModule } from '../modules/auth/auth.module';
=======
import { AuthModule } from './auth/auth.module';
>>>>>>> cc4037b368639bf06cc04f043821f846551ce3ba

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
      }
    ],
  },
];
