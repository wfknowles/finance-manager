import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { BudgetItemEntity } from './budget-item.entity';
import { BudgetItemService } from './budget-item.service';

@ApiTags('budget-items')
@Crud({
  model: {
    type: BudgetItemEntity,
  },
})
@Controller()
export class BudgetItemController implements CrudController<BudgetItemEntity> {
  constructor(public service: BudgetItemService) {}
}
