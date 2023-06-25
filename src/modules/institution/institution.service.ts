import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InstitutionEntity } from './institution.entity';

@Injectable()
export class InstitutionService extends TypeOrmCrudService<InstitutionEntity> {
  constructor(@InjectRepository(InstitutionEntity) repo) {
    super(repo);
  }
}
