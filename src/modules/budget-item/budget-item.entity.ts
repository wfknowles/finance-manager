import { BaseEntity } from 'src/config/base-entity';
import { ColumnNumericTransformer } from 'src/utils/column-numeric.transformer';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
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

  @Column({
    type: 'numeric',
    precision: 9,
    scale: 2,
    nullable: true,
    transformer: new ColumnNumericTransformer(),
    comment: '',
  })
  amount: number;

  @Column({
    comment: '',
  })
  canAccrue: boolean;

  @Column({
    type: 'numeric',
    precision: 9,
    scale: 2,
    nullable: true,
    transformer: new ColumnNumericTransformer(),
    comment: '',
  })
  accrualMax: number;

  @Column({
    comment: '',
  })
  label?: string;

  @Column({
    comment: '',
  })
  order?: number;

  /**
   * Relations
   */
  @ManyToOne(() => ConcernEntity, (concern) => concern.budgetItems)
  concern?: ConcernEntity;

  @ManyToOne(() => BudgetEntity, (budget) => budget.budgetItems)
  budget?: BudgetEntity;
}
