import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from './account.entity';

@Injectable()
export class AccountService extends TypeOrmCrudService<AccountEntity> {
  constructor(
    @InjectRepository(AccountEntity)
    protected readonly repo: Repository<AccountEntity>,
  ) {
    super(repo);
  }
}
