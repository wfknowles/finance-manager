import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { TIMESTAMP_FIELDS } from 'src/config/constants';
import { InstitutionEntity } from './institution.entity';
import { InstitutionService } from './institution.service';

@ApiTags('institutions')
@Crud({
  model: {
    type: InstitutionEntity,
  },
  query: {
    exclude: TIMESTAMP_FIELDS,
    join: {},
  },
})
@Controller()
export class InstitutionController
  implements CrudController<InstitutionEntity>
{
  constructor(public service: InstitutionService) {}
}
