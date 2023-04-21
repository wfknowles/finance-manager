import { BaseEntity } from 'src/config/base-entity';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { BudgetEntity } from '../budget/budget.entity';
import { ConcernEntity } from '../concern/concern.entity';

@Entity({
  name: 'budget_items',
  orderBy: {
    sort: 'ASC',
    name: 'ASC',
  },
})
export class BudgetItemEntity extends BaseEntity {
  @Column({
    comment: '',
  })
  name: string;

  /**
   * Relations
   */
  @OneToOne(() => ConcernEntity, (concern) => concern.budgetItem)
  concern?: ConcernEntity;

  @ManyToOne(() => BudgetEntity, (budget) => budget.budgetItems)
  budget?: BudgetEntity;
}
