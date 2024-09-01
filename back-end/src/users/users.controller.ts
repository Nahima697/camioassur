import { Body, Controller, Get, HttpException, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UsersServices } from "./users.service";
import { CreateUserDto } from "./dto/CreateUser.dto";
import mongoose from "mongoose";

@Controller('User')

export class UsersController {
    constructor (private usersService:UsersServices) {}

    @Post()
    @UsePipes(new ValidationPipe())
    createUser(@Body() createUserDto: CreateUserDto) {
        console.log(createUserDto)
      return  this.usersService.createUser(createUserDto);
    }
     @Get()
     getUsers () {
        return this.usersService.getUsers();
     }

    @Get(':id')
     async getUserById(@Param('id')id:string) {
     const isValid = mongoose.Types.ObjectId.isValid(id);
     if (!isValid) throw new HttpException('User not found', 404);
     const findUser = await this.usersService.getUserByid(id);
     if (!findUser) throw new HttpException('User not found', 404);
     return findUser;
     }
     
}