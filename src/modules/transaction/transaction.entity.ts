import { BaseEntity } from 'src/config/base-entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { AccountEntity } from '../account/account.entity';

@Entity({
  name: 'transactions',
  orderBy: {
    sort: 'ASC',
    name: 'ASC',
  },
})
export class TransactionEntity extends BaseEntity {
  @Column({
    comment: '',
  })
  name: string;

  /**
   * Relations
   */

  @ManyToOne(() => AccountEntity, (account) => account.transactions)
  account?: AccountEntity;
}
