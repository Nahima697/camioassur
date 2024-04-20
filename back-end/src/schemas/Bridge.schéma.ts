import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Booking } from "./Booking.schema"; 

@Schema({ collection: 'Bridge' })
export class Bridge {
    @Prop()
    _id: string;

    @Prop() 
    reference: string;

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'bookings' }]) 
    bookings: Booking[]; 
}

export const BridgeSchema = SchemaFactory.createForClass(Bridge);
