import {  IsNotEmpty, IsString } from "class-validator";

export class CreateTruckDto {
    @IsNotEmpty()
    @IsString()
    brand:string;
    @IsNotEmpty()
    @IsString()
    vehicleModel:string;
    @IsNotEmpty()
    @IsString()
    registrationNumber:string;
}