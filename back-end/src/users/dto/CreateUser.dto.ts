import { IsEmail, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { CreateTruckDto } from "src/trucks/dto/CreateTruckDto";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    lastName:string;
    @IsNotEmpty()
    @IsString()
    firstName:string;
    @IsEmail()
    email:string;
    @IsNumber()
    @IsOptional()
    phone?:number;
     @IsNotEmpty()
    @IsMongoId() 
    truck: CreateTruckDto; 

}