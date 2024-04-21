import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CalendarService } from "./calendar.service";
import { Bridge, BridgeSchema } from "src/schemas/Bridge.schéma";
import { CalendarController } from "./calender.controller";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Bridge.name, schema: BridgeSchema }])
    ],
    providers: [CalendarService],
    controllers: [CalendarController]
})
export class CalendarModule {}
