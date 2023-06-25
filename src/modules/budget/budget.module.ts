import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BudgetItemModule } from '../budget-item/budget-item.module';
import { BudgetController } from './budget.controller';
import { BudgetEntity } from './budget.entity';
import { BudgetService } from './budget.service';

@Module({
  imports: [TypeOrmModule.forFeature([BudgetEntity]), BudgetItemModule],
  providers: [BudgetService],
  controllers: [BudgetController],
  exports: [BudgetService],
})
export class BudgetModule {}
