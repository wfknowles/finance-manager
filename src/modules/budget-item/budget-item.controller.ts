import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { TIMESTAMP_FIELDS } from 'src/config/constants';
import { BudgetItemEntity } from './budget-item.entity';
import { BudgetItemService } from './budget-item.service';

@ApiTags('budget-items')
@Crud({
  model: {
    type: BudgetItemEntity,
  },
  query: {
    exclude: TIMESTAMP_FIELDS,
    join: {},
  },
})
@Controller()
export class BudgetItemController implements CrudController<BudgetItemEntity> {
  constructor(public service: BudgetItemService) {}
}
