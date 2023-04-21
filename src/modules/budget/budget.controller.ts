import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { BudgetEntity } from './budget.entity';
import { BudgetService } from './budget.service';

@ApiTags('budgets')
@Crud({
  model: {
    type: BudgetEntity,
  },
})
@Controller()
export class BudgetController implements CrudController<BudgetEntity> {
  constructor(public service: BudgetService) {}
}
