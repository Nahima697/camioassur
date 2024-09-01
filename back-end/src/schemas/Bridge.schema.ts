import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema({ collection: 'Bridge' })
export class Bridge extends Document {
    @Prop()
    _id: string;

    @Prop()
    reference: string;

    @Prop({ type: [{ startDate: String, endDate: String }] })
    appointments: { startDate: string, endDate: string }[];
}

export const BridgeSchema = SchemaFactory.createForClass(Bridge);
