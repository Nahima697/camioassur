
import { Type } from 'class-transformer';
import { ArrayMinSize, ArrayNotEmpty, IsNotEmpty, IsString} from 'class-validator';

export class UpdateBridgeDto {
  @IsNotEmpty()
  @IsString()
  reference?: string;

  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @Type(() => Appointment)
  appointments: Appointment[];
 
}
export class Appointment{
    @IsNotEmpty()
    startDate: string;
  
    @IsNotEmpty()
    endDate: string;
  }