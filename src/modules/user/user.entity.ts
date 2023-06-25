import { BaseEntity } from 'src/config/base-entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { AccountEntity } from '../account/account.entity';

@Entity({
  name: 'users',
})
export class UserEntity extends BaseEntity {
  @Column({
    comment: '',
  })
  firstName: string;

  @Column({
    comment: '',
  })
  lastName: string;

  @Column({
    comment: '',
  })
  username: string;

  @Column({
    comment: '',
  })
  email?: string;

  @Column({
    comment: '',
  })
  password: string;

  /**
   * Relations
   */

  @ManyToOne(() => AccountEntity, (account) => account.users)
  account?: AccountEntity;

  // @ManyToOne(() => ConcernEntity, (concern) => concern.transactions)
  // concern?: ConcernEntity;
}
