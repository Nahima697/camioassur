import { Expose } from "class-transformer";
import {  IsNotEmpty, IsString } from "class-validator";

export class CreateTruckDto {

    @Expose()
    @IsNotEmpty()
    @IsString()
    brand:string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    vehicleModel:string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    registrationNumber:string;
}