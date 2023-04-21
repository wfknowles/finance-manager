import { BaseEntity } from 'src/config/base-entity';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { AccountEntity } from '../account/account.entity';
import { BudgetItemEntity } from '../budget-item/budget-item.entity';

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

  /**
   * Relations
   */

  @OneToOne(() => BudgetItemEntity, (budgetItem) => budgetItem.concern)
  budgetItem?: ConcernEntity;

  @ManyToOne(() => AccountEntity, (account) => account.concerns)
  account?: AccountEntity;
}
