import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { BudgetItemService } from '../budget-item/budget-item.service';
import { BudgetEntity } from './budget.entity';

@Injectable()
export class BudgetService extends TypeOrmCrudService<BudgetEntity> {
  constructor(
    @InjectRepository(BudgetEntity) repo,
    private budgetItemService: BudgetItemService,
  ) {
    super(repo);
  }

  async getBudgetItems(accountId: number, budgetId: number) {
    console.log('getting budget items...');

    const items = await this.budgetItemService.find({
      where: {
        account: {
          id: accountId,
        },
        budget: {
          id: budgetId,
        },
      },
    });

    return items;
  }
}
