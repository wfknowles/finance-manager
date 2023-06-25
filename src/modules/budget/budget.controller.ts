import { Controller, Get, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { TIMESTAMP_FIELDS } from 'src/config/constants';
import { BudgetItemService } from '../budget-item/budget-item.service';
import { BudgetEntity } from './budget.entity';
import { BudgetService } from './budget.service';

@ApiTags('budgets')
@Crud({
  model: {
    type: BudgetEntity,
  },
  query: {
    exclude: TIMESTAMP_FIELDS,
    join: {},
  },
})
@Controller()
export class BudgetController implements CrudController<BudgetEntity> {
  constructor(public service: BudgetService) {}

  @Get('/getItems')
  async getBudgetItems() {
    const accountId = 1;
    const budgetId = 1;
    return this.service.getBudgetItems(accountId, budgetId);
  }
}
