import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { BudgetItemEntity } from './budget-item.entity';

@Injectable()
export class BudgetItemService extends TypeOrmCrudService<BudgetItemEntity> {
  constructor(@InjectRepository(BudgetItemEntity) repo) {
    super(repo);
  }
}
