import {  IsNotEmpty, IsString } from "class-validator";
import { Booking } from "src/schemas/Booking.schema";


export class UpdateBridgeDto {
    @IsNotEmpty()
    @IsString()
    reference?:string;

    @IsNotEmpty() 
    
    bookings?:Booking[]

}