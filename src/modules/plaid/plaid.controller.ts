import {
  Controller,
  Request,
  Post,
  UseGuards,
  Logger,
  Get,
  Put,
} from '@nestjs/common';
import { PlaidService } from './plaid.service';

@Controller()
export class PlaidController {
  private readonly logger: Logger;

  constructor(private service: PlaidService) {
    this.logger = new Logger(this.constructor.name);
  }

  @Get('init')
  init(@Request() req) {
    return this.service.init();
  }

  @Get('token/public')
  getProfile(@Request() req) {
    return this.service.getPublicToken();
  }

  @Get('token/public/exchange')
  getExchange(@Request() req) {
    return this.service.exchangeToken();
  }

  @Post('token/link')
  createLink() {
    return this.service.createLinkToken();
  }

  @Get('token/link')
  getLink() {
    return this.service.getLinkToken();
  }

  @Put('token/link')
  updateLink() {
    return this.service.updateLinkToken();
  }

  @Get('transactions')
  getTransactions() {
    return this.service.getTransactions();
  }

  @Get('transactions/sync')
  getTransactionsSync() {
    return this.service.getTransactionsSync();
  }

  @Get('transactions/refresh')
  getTransactionsRefresh() {
    return this.service.getTransactionsRefresh();
  }
}
