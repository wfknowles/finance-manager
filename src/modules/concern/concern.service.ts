import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ConcernEntity } from './concern.entity';

@Injectable()
export class ConcernService extends TypeOrmCrudService<ConcernEntity> {
  constructor(@InjectRepository(ConcernEntity) repo) {
    super(repo);
  }
}
