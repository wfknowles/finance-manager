import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PlaidController } from './plaid.controller';
import { PlaidService } from './plaid.service';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [PlaidService],
  exports: [PlaidService],
  controllers: [PlaidController],
})
export class PlaidModule {}