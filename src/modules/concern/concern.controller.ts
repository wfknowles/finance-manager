import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/config/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/config/auth/local-auth.guard';
import { TIMESTAMP_FIELDS } from 'src/config/constants';
import { AuthAccountId } from 'src/decorators/auth-user.decorator';
import { ConcernEntity } from './concern.entity';
import { ConcernService } from './concern.service';

@ApiTags('concerns')
@Crud({
  model: {
    type: ConcernEntity,
  },
  query: {
    exclude: TIMESTAMP_FIELDS,
    join: {},
  },
})
@Controller()
export class ConcernController implements CrudController<ConcernEntity> {
  constructor(public service: ConcernService) {}

  @Get('/ordered')
  async getAccountConcerns(@AuthAccountId() accountId: number) {
    return this.service.getOrderedConcerns(accountId);
  }
}
