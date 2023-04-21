import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BudgetItemController } from './budget-item.controller';
import { BudgetItemEntity } from './budget-item.entity';
import { BudgetItemService } from './budget-item.service';

@Module({
  imports: [TypeOrmModule.forFeature([BudgetItemEntity])],
  providers: [BudgetItemService],
  controllers: [BudgetItemController],
  exports: [BudgetItemService],
})
export class BudgetItemModule {}
