import { BaseEntity } from 'src/config/base-entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AccountEntity } from '../account/account.entity';
import { TransactionEntity } from '../transaction/transaction.entity';

@Entity({
  name: 'institutions',
})
export class InstitutionEntity extends BaseEntity {
  @Column({
    comment: '',
  })
  name: string;

  /**
   * Relations
   */
  @ManyToOne(() => AccountEntity, (account) => account.institutions)
  account?: AccountEntity;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.account)
  transactions?: TransactionEntity[];
}
