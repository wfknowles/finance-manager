import { Routes } from 'nest-router';
import { AuthModule } from '../modules/auth/auth.module';

export const routes: Routes = [
  {
    path: 'api',
    children: [
      {
        path: 'auth',
        module: AuthModule,
      },
    ],
  },
];