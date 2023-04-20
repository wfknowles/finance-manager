import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@ApiTags('users')
@Crud({
  model: {
    type: UserEntity,
  },
})
@Controller()
export class UserController implements CrudController<UserEntity> {
  constructor(public service: UserService) {}
}
