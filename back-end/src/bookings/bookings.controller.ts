import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { BookingService } from "./bookings.service";
import { CreateBookingDto } from "./dto/CreateBooking.dto";

@Controller('bookings')

export class BookingsController {
    constructor(private bookingsService:BookingService) {}

    @Post('/reserve')
    @UsePipes(new ValidationPipe())

    createBooking(@Body() createBookingDto:CreateBookingDto) {

        return this.bookingsService.createBooking(createBookingDto);
    }



}



