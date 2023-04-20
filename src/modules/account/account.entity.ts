import { IsHexColor, IsOptional } from 'class-validator';
import { BaseEntity } from 'src/config/base-entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'account',
  orderBy: {
    sort: 'ASC',
    name: 'ASC',
  },
})
export class AccountEntity extends BaseEntity {
  @Column({
    comment: '',
  })
  name: string;
}
