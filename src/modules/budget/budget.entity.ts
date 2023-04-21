import { BaseEntity } from 'src/config/base-entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AccountEntity } from '../account/account.entity';
import { BudgetItemEntity } from '../budget-item/budget-item.entity';

@Entity({
  name: 'budgets',
  orderBy: {
    sort: 'ASC',
    name: 'ASC',
  },
})
export class BudgetEntity extends BaseEntity {
  @Column({
    comment: '',
  })
  name: string;

  /**
   * Relations
   */

  @OneToMany(() => BudgetItemEntity, (budgetItem) => budgetItem.budget)
  budgetItems?: BudgetItemEntity[];

  @ManyToOne(() => AccountEntity, (account) => account.budgets)
  account?: AccountEntity;
}
