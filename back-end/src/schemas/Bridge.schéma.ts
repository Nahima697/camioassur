import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: 'Bridge' })
export class Bridge {
    @Prop()
    _id: string;

    @Prop() 
    reference: string;

 
    @Prop({ type: [{ startDate: Date, endDate: Date }] })
    appointments: { startDate: Date, endDate: Date }[];
}

export const BridgeSchema = SchemaFactory.createForClass(Bridge);
