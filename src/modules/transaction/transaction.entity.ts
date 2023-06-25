import { BaseEntity } from 'src/config/base-entity';
import { ColumnNumericTransformer } from 'src/utils/column-numeric.transformer';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AccountEntity } from '../account/account.entity';
import { ConcernEntity } from '../concern/concern.entity';
import { InstitutionEntity } from '../institution/institution.entity';

@Entity({
  name: 'transactions',
})
export class TransactionEntity extends BaseEntity {
  @Column({
    type: 'date',
    comment: '',
  })
  date: Date;

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
    nullable: true,
  })
  description?: string;

  @Column({
    nullable: true,
  })
  parentId?: number;

  /**
   * Relations
   */

  @OneToMany(() => TransactionEntity, (transaction) => transaction.parent)
  children?: TransactionEntity[];

  @ManyToOne(() => AccountEntity, (account) => account.transactions)
  account?: AccountEntity;

  @ManyToOne(() => ConcernEntity, (concern) => concern.transactions)
  concern?: ConcernEntity;

  @ManyToOne(() => InstitutionEntity, (institution) => institution.transactions)
  institution?: InstitutionEntity;

  @ManyToOne(() => TransactionEntity, (transaction) => transaction.children)
  @JoinColumn({ name: 'parentId' })
  parent?: TransactionEntity;
}
