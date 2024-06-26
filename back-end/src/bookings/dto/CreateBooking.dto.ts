import { IsNotEmpty, IsDateString, IsMongoId } from 'class-validator';
import { CreateTruckDto } from 'src/trucks/dto/CreateTruckDto';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';

export class CreateBookingDto {
  @IsNotEmpty()
  user: CreateUserDto; 

  @IsNotEmpty()
  truck: CreateTruckDto;

  @IsNotEmpty()
  @IsDateString()
  startTime: Date; 

  @IsNotEmpty()
  @IsDateString()
  endTime: Date;

  @IsNotEmpty() 
  @IsMongoId()
  bridgeId: string; 
}
