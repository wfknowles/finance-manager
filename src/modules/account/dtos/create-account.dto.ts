import { Exclude, Expose } from 'class-transformer';
import { IsISO8601, IsOptional, IsString } from 'class-validator';

@Exclude()
export class CreateAccountDto {
  @Expose()
  @IsString()
  name: string;
}
