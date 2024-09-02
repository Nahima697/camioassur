import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { BookingService } from "./bookings.service";
import { CreateBookingDto } from "./dto/CreateBooking.dto";
import { CreateUserDto } from "src/users/dto/CreateUser.dto";
import { CreateTruckDto } from "src/trucks/dto/CreateTruckDto.dto";

@Controller('bookings')
export class BookingsController {
    constructor(private bookingsService: BookingService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    async createBooking(
        @Body() createBookingDto: CreateBookingDto,
        @Body() createUserDto: CreateUserDto,
        @Body() createTruckDto: CreateTruckDto
    ) {
        return this.bookingsService.createBooking(createBookingDto, createUserDto, createTruckDto);
    }
}
