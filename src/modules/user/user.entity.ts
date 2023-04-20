import { BaseEntity } from 'src/config/base-entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'account',
  orderBy: {
    sort: 'ASC',
    name: 'ASC',
  },
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
  email: string;

  @Column({
    comment: '',
  })
  password: string;
}
