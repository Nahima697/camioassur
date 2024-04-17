import { IsNotEmpty, IsDateString, IsMongoId } from 'class-validator';
import { CreateTruckDto } from 'src/trucks/dto/CreateTruckDto';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';


export class CreateBookingDto {
  @IsNotEmpty()
  @IsMongoId() 
  user: CreateUserDto; 

  @IsNotEmpty()
  @IsMongoId() 
  truck: CreateTruckDto; 

  @IsNotEmpty()
  @IsDateString() 
  date: string; 
}
