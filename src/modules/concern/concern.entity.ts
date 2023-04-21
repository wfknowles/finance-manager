import { BaseEntity } from 'src/config/base-entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { AccountEntity } from '../account/account.entity';
import { BudgetItemEntity } from '../budget-item/budget-item.entity';
import { TransactionEntity } from '../transaction/transaction.entity';

@Entity({
  name: 'concerns',
  orderBy: {
    sort: 'ASC',
    name: 'ASC',
  },
})
export class ConcernEntity extends BaseEntity {
  @Column({
    comment: '',
  })
  name: string;

  @Column({
    nullable: true,
  })
  parentId?: number;

  /**
   * Relations
   */

  @OneToMany(() => TransactionEntity, (transaction) => transaction.concern)
  transactions?: TransactionEntity[];

  @OneToMany(() => BudgetItemEntity, (budgetItem) => budgetItem.concern)
  budgetItems?: ConcernEntity[];

  @OneToMany(() => ConcernEntity, (concern) => concern.parent)
  children?: ConcernEntity[];

  @ManyToOne(() => AccountEntity, (account) => account.concerns)
  account?: AccountEntity;

  @ManyToOne(() => ConcernEntity, (concern) => concern.children)
  @JoinColumn({ name: 'parentId' })
  parent?: ConcernEntity;
}
