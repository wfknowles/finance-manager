import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import {
  Connection,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

import * as bcrypt from 'bcrypt';
import { UserEntity } from './user.entity';

@Injectable()
export class UserSubscribers implements EntitySubscriberInterface<UserEntity> {
  private readonly logger: Logger;
  private readonly salt = 10;

  constructor(@InjectConnection() protected readonly connection: Connection) {
    this.logger = new Logger('InvoiceItemSubscribers');
    this.connection.subscribers.push(this);
  }
  /**
   * Indicates that this subscriber only listen to User events.
   */
  listenTo() {
    return UserEntity;
  }

  async beforeInsert(event: InsertEvent<UserEntity>) {
    event.entity.password = await bcrypt.hash(event.entity.password, this.salt);
    return event;
  }

  async beforeUpdate(event: UpdateEvent<UserEntity>) {
    event.entity.password = await bcrypt.hash(event.entity.password, this.salt);
    return event;
  }
}
