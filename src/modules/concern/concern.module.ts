import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConcernController } from './concern.controller';
import { ConcernEntity } from './concern.entity';
import { ConcernService } from './concern.service';

@Module({
  imports: [TypeOrmModule.forFeature([ConcernEntity])],
  providers: [ConcernService],
  controllers: [ConcernController],
  exports: [ConcernService],
})
export class ConcernModule {}
