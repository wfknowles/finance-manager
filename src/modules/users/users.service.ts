import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/users/interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      username: 'admin',
      password: 'admin',
    },
    {
      id: 2,
      username: 'user',
      password: 'user',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
