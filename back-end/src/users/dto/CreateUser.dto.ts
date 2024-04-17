import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

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
}