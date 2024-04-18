import {  IsNotEmpty, IsString } from "class-validator";


export class CreateBridgeDto {
    @IsNotEmpty()
    @IsString()
    reference:string;
    available:boolean;

}