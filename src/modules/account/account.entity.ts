import { BaseEntity } from 'src/config/base-entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { BudgetItemEntity } from '../budget-item/budget-item.entity';
import { BudgetEntity } from '../budget/budget.entity';
import { ConcernEntity } from '../concern/concern.entity';
import { InstitutionEntity } from '../institution/institution.entity';
import { TransactionEntity } from '../transaction/transaction.entity';
import { UserEntity } from '../user/user.entity';

@Entity({
  name: 'accounts',
})
export class AccountEntity extends BaseEntity {
  @Column({
    comment: '',
  })
  name: string;

  /**
   * Relations
   */

  @OneToMany(() => UserEntity, (user) => user.account)
  users?: UserEntity[];

  @OneToMany(() => BudgetEntity, (budget) => budget.account)
  budgets?: BudgetEntity[];

  @OneToMany(() => BudgetItemEntity, (item) => item.account)
  items?: BudgetItemEntity[];

  @OneToMany(() => ConcernEntity, (concern) => concern.account)
  concerns?: ConcernEntity[];

  @OneToMany(() => InstitutionEntity, (institution) => institution.account)
  institutions?: InstitutionEntity[];

  @OneToMany(() => TransactionEntity, (transaction) => transaction.account)
  transactions?: ConcernEntity[];
}
