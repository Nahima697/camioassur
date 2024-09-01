import { IsEmail,  IsNotEmpty,  IsString, Matches } from "class-validator";


export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    lastName:string;
    @IsNotEmpty()
    @IsString()
    firstName:string;
    @IsEmail()
    email:string;
    @Matches(/^\+?[1-9]\d{1,14}$/, { message: 'phone must be a valid phone number' })
    phone: string;
}