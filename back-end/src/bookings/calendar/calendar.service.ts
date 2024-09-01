import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bridge } from 'src/schemas/Bridge.schema';

@Injectable()
export class CalendarService {
  constructor(
    @InjectModel(Bridge.name) private readonly bridgeModel: Model<Bridge>,
  ) {}

  async getExistingAppointmentsForAllBridges(): Promise<Bridge[]> {
    return this.bridgeModel.find().exec();
  }




}
