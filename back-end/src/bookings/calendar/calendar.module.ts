import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CalendarService } from "./calendar.service";
import { Bridge, BridgeSchema } from "src/schemas/Bridge.schema";
import { CalendarController } from "./calender.controller";
import { AvailabilityService } from "src/availability/availability.service";
import { Booking, BookingSchema } from "src/schemas/Booking.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Bridge.name, schema: BridgeSchema }, {name:Booking.name,schema:BookingSchema}])
    ],
    providers: [CalendarService,AvailabilityService],
    controllers: [CalendarController]
})
export class CalendarModule {}
