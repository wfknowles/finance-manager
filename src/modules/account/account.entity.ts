import { BaseEntity } from 'src/config/base-entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { BudgetEntity } from '../budget/budget.entity';
import { ConcernEntity } from '../concern/concern.entity';
import { TransactionEntity } from '../transaction/transaction.entity';

@Entity({
  name: 'accounts',
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

  /**
   * Relations
   */

  @OneToMany(() => BudgetEntity, (budget) => budget.account)
  budgets?: BudgetEntity[];

  @OneToMany(() => ConcernEntity, (concern) => concern.account)
  concerns?: ConcernEntity[];

  @OneToMany(() => TransactionEntity, (transaction) => transaction.account)
  transactions?: ConcernEntity[];
}
