import { Module } from "@nestjs/common";

import { MongooseModule } from "@nestjs/mongoose";
import { BookingService } from "./bookings.service";
import { BookingsController } from "./bookings.controller";
import { Booking, BookingSchema } from "src/schemas/Booking.schema";
import { User, UserSchema } from "src/schemas/User.shema";
import { OpeningHoursService } from "src/openingHours/openingHours.service";
import AvailabilitySchedule = require('availability-schedule');
import { Truck, TruckSchema } from "src/schemas/Truck.schema";
import { AvailabilityService } from "./Availability/availability.service";
import { Bridge, BridgeSchema } from "src/schemas/Bridge.schéma";



@Module({
    imports: [
        MongooseModule.forFeature([ {
            name: Booking.name,
            schema: BookingSchema,
        },
        { name: User.name, schema: UserSchema },
        { name: Truck.name, schema: TruckSchema },
        { name: Bridge.name, schema: BridgeSchema },
    ]),
    ],
    providers : [BookingService,OpeningHoursService,AvailabilitySchedule,AvailabilityService],
    controllers : [ BookingsController]
})

export class BookingsModule {

}