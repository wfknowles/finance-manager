import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { AccountEntity } from './account.entity';
import { AccountService } from './account.service';

@ApiTags('accounts')
@Crud({
  model: {
    type: AccountEntity,
  },
})
@Controller()
export class AccountController implements CrudController<AccountEntity> {
  constructor(public service: AccountService) {}
}
