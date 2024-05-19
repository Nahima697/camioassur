import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bridge } from 'src/schemas/Bridge.schema';
import { AvailabilityService } from 'src/availability/availability.service';

@Injectable()
export class CalendarService {
  constructor(
    @InjectModel(Bridge.name) private readonly bridgeModel: Model<Bridge>,
    private readonly availabilityService: AvailabilityService
  ) {}

  async getExistingAppointmentsForAllBridges(): Promise<Bridge[]> {
    return this.bridgeModel.find().exec();
  }

  async countAvailableSlotsForAllBridges(
    start: Date,
    end: Date
  ): Promise<boolean> {
    try {
      const bridges = await this.getExistingAppointmentsForAllBridges();
  
      console.log(`Total bridges: ${bridges.length}`);
  
      for (const bridge of bridges) {
        const isAvailable = await this.availabilityService.isSlotAvailable(
          bridge._id,
          start,
          end
        );
  
        console.log(`Bridge ID: ${bridge._id}, Is available: ${isAvailable}`);
  
        if (!isAvailable) {
          return false;
        }
      }
      return true;
    } catch (error) {
      console.error(error.message, error.stack);
      throw error;
    }
  }
  
  
}
