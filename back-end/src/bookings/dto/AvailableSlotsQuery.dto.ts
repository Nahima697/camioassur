import { IsISO8601 } from 'class-validator';

export class AvailableSlotsQueryDto {
  @IsISO8601()
  start: string;

  @IsISO8601()
  end: string;
}
