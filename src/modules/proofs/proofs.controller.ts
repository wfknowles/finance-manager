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

  @Post('regex')
  init(@Request() req) {
    return this.service.regex(req.body);
  }

  @Post('test')
  runTest(@Request() req) {
    return this.service.test(req.body);
  }
}
