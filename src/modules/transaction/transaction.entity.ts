import { BaseEntity } from 'src/config/base-entity';
import { ColumnNumericTransformer } from 'src/utils/column-numeric.transformer';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AccountEntity } from '../account/account.entity';
import { ConcernEntity } from '../concern/concern.entity';

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
    comment: 'Institution provided transaction detail',
  })
  detail: string;

  @Column({
    comment: 'User provided transaction description',
  })
  description?: string;

  @Column({
    nullable: true,
  })
  parentId?: number;

  /**
   * Relations
   */

  @OneToMany(() => TransactionEntity, (transaction) => transaction.parent, {
    eager: true,
  })
  children?: TransactionEntity[];

  @ManyToOne(() => AccountEntity, (account) => account.transactions)
  account?: AccountEntity;

  @ManyToOne(() => ConcernEntity, (concern) => concern.transactions)
  concern?: ConcernEntity;

  @ManyToOne(() => TransactionEntity, (transaction) => transaction.children)
  @JoinColumn({ name: 'parentId' })
  parent?: TransactionEntity;
}
