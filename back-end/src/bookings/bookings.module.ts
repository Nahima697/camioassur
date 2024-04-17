import { Module } from "@nestjs/common";

import { MongooseModule } from "@nestjs/mongoose";
import { BookingService } from "./bookings.service";
import { BookingsController } from "./bookings.controller";
import { Booking, BookingSchema } from "src/schemas/Booking.schema";



@Module({
    imports: [
        MongooseModule.forFeature([ {
            name: Booking.name,
            schema: BookingSchema,
        }
    ])
    ],
    providers : [BookingService],
    controllers : [ BookingsController]
})

export class BookingsModule {

}