import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { TIMESTAMP_FIELDS } from 'src/config/constants';
import { AccountEntity } from './account.entity';
import { AccountService } from './account.service';

@ApiTags('accounts')
@Crud({
  model: {
    type: AccountEntity,
  },
  query: {
    exclude: TIMESTAMP_FIELDS,
    join: {
      budgets: {
        eager: false,
      },
      concerns: {
        eager: false,
      },
    },
  },
})
@Controller()
export class AccountController implements CrudController<AccountEntity> {
  constructor(public service: AccountService) {}
}
