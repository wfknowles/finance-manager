import { BaseEntity } from 'src/config/base-entity';
import { ColumnNumericTransformer } from 'src/utils/column-numeric.transformer';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { AccountEntity } from '../account/account.entity';
import { BudgetEntity } from '../budget/budget.entity';
import { ConcernEntity } from '../concern/concern.entity';

@Entity({
  name: 'budget_items',
})
export class BudgetItemEntity extends BaseEntity {
  @Column({
    type: 'numeric',
    precision: 9,
    scale: 2,
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
  accrualMax?: number;

  @Column({
    comment: '',
    nullable: true,
  })
  label?: string;

  @Column({
    comment: '',
    nullable: true,
  })
  order?: number;

  /**
   * Relations
   */
  @ManyToOne(() => AccountEntity, (account) => account.items)
  account?: AccountEntity;

  @ManyToOne(() => BudgetEntity, (budget) => budget.items)
  budget?: BudgetEntity;

  @ManyToOne(() => ConcernEntity, (concern) => concern.items)
  concern?: ConcernEntity;
}
