import { Module } from '@nestjs/common';
import { MagicStringService } from './magic-string.service';
import { ProofsController } from './proofs.controller';
import { ProofsService } from './proofs.service';

@Module({
  controllers: [ProofsController],
  providers: [ProofsService, MagicStringService],
  exports: [ProofsService],
})
export class ProofsModule {}
