import {  IsNotEmpty, IsString } from "class-validator";

export class CreateTruckDto {
    @IsNotEmpty()
    @IsString()
    model:string;
    @IsNotEmpty()
    @IsString()
    brand:string;
    @IsNotEmpty()
    @IsString()
    registrationNumber:string;
}