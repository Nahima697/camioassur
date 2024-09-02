import { IsNotEmpty, IsDateString, IsMongoId } from 'class-validator';


export class CreateBookingDto {
  @IsNotEmpty()
  user: string; 

  @IsNotEmpty()
  truck: string;

  @IsNotEmpty()
  @IsDateString()
  startTime: string; 

  @IsNotEmpty()
  @IsDateString()
  endTime: string;

  @IsNotEmpty() 
  @IsMongoId()
  bridgeId: string; 
}
