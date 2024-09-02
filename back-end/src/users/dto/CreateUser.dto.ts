import { Expose } from "class-transformer";
import { IsEmail,  IsNotEmpty,  IsString } from "class-validator";


export class CreateUserDto {

    
    @Expose()
    @IsNotEmpty()
    @IsString()
    lastName:string; 

    @Expose()
    @IsNotEmpty()
    @IsString()
    firstName:string;

    @Expose()
    @IsEmail()
    email:string;

    @Expose()
    phone: string;
}