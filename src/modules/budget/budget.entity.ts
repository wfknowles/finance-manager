import { BaseEntity } from 'src/config/base-entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AccountEntity } from '../account/account.entity';
import { BudgetItemEntity } from '../budget-item/budget-item.entity';

@Entity({
  name: 'budgets',
})
export class BudgetEntity extends BaseEntity {
  @Column({
    comment: '',
  })
  name: string;

  /**
   * Relations
   */

  @OneToMany(() => BudgetItemEntity, (item) => item.budget)
  items?: BudgetItemEntity[];

  @ManyToOne(() => AccountEntity, (account) => account.budgets)
  account?: AccountEntity;
}
