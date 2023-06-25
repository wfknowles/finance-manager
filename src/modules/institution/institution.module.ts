import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstitutionController } from './institution.controller';
import { InstitutionEntity } from './institution.entity';
import { InstitutionService } from './institution.service';

@Module({
  imports: [TypeOrmModule.forFeature([InstitutionEntity])],
  providers: [InstitutionService],
  controllers: [InstitutionController],
  exports: [InstitutionService],
})
export class InstitutionModule {}
