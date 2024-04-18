import { Module } from "@nestjs/common";

import { MongooseModule } from "@nestjs/mongoose";
import { BookingService } from "./bookings.service";
import { BookingsController } from "./bookings.controller";
import { Booking, BookingSchema } from "src/schemas/Booking.schema";
import { User, UserSchema } from "src/schemas/User.shema";
import { Bridge, BridgeSchema } from "src/schemas/Bridge.schéma";
import { OpeningHoursService } from "src/openingHours/openingHours.service";
import AvailabilitySchedule = require('availability-schedule');



@Module({
    imports: [
        MongooseModule.forFeature([ {
            name: Booking.name,
            schema: BookingSchema,
        },
        { name: Bridge.name, schema: BridgeSchema },
        { name: User.name, schema: UserSchema },
    ]),
    ],
    providers : [BookingService,OpeningHoursService,AvailabilitySchedule],
    controllers : [ BookingsController]
})

export class BookingsModule {

}