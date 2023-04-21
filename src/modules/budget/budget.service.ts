import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { BudgetEntity } from './budget.entity';

@Injectable()
export class BudgetService extends TypeOrmCrudService<BudgetEntity> {
  constructor(@InjectRepository(BudgetEntity) repo) {
    super(repo);
  }
}
