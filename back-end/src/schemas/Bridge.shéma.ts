import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from 'mongoose';
import { OpeningHours } from "./OpeningHours.schema";

@Schema()
export class Bridge {
    @Prop()
    _id: string;
    @Prop({required:true, default:2})
    quantity: number;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OpeningHours' }] })
    openingHours: OpeningHours[];
 
}

 export const BridgeShema = SchemaFactory.createForClass(Bridge);