import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { TIMESTAMP_FIELDS } from 'src/config/constants';
import { TransactionEntity } from './transaction.entity';
import { TransactionService } from './transaction.service';

@ApiTags('transactions')
@Crud({
  model: {
    type: TransactionEntity,
  },
  query: {
    exclude: TIMESTAMP_FIELDS,
    join: {},
  },
})
@Controller()
export class TransactionController
  implements CrudController<TransactionEntity>
{
  constructor(public service: TransactionService) {}
}
