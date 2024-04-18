import { IsNotEmpty,IsMongoId, IsDate } from 'class-validator';
import { CreateBridgeDto } from 'src/bridge/CreateBridgeDto';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';


export class CreateBookingDto {
  @IsNotEmpty()
  @IsMongoId() 
  user: CreateUserDto; 
  @IsNotEmpty()
  @IsMongoId() 
  bridge: CreateBridgeDto; 

  @IsNotEmpty()
  @IsDate() 
  startTime: Date; 
  @IsNotEmpty()
  @IsDate() 
  endTime: Date; 
}
