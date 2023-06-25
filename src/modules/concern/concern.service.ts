import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ConcernEntity } from './concern.entity';

@Injectable()
export class ConcernService extends TypeOrmCrudService<ConcernEntity> {
  constructor(@InjectRepository(ConcernEntity) repo) {
    super(repo);
  }

  async getOrderedConcerns(accountId: number) {
    const concerns = await this.repo.find({
      select: ['id', 'name', 'children'],
      where: {
        account: {
          id: accountId,
        },
        parentId: null,
      },
      order: {
        order: 'ASC',
        name: 'ASC',
      },
      relations: ['children', 'children.children'],
    });

    return concerns;
  }
}
