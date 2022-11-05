import {
  Controller,
  Request,
  Post,
  UseGuards,
  Logger,
  Get,
  Put,
} from '@nestjs/common';
import { ProofsService } from './proofs.service';

@Controller()
export class ProofsController {
  private readonly logger: Logger;

  constructor(private service: ProofsService) {
    this.logger = new Logger(this.constructor.name);
  }

  @Post('expressions')
  runExpressions(@Request() req) {
    return this.service.bulkExpressionHandler(req.body);
  }

  @Post('expression')
  runExpression(@Request() req) {
    return this.service.bulkExpressionHandler(req.body);
  }
}
