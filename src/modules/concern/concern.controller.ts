import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { ConcernEntity } from './concern.entity';
import { ConcernService } from './concern.service';

@ApiTags('concerns')
@Crud({
  model: {
    type: ConcernEntity,
  },
})
@Controller()
export class ConcernController implements CrudController<ConcernEntity> {
  constructor(public service: ConcernService) {}
}
