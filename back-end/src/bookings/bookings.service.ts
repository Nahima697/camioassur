import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from 'src/schemas/Booking.schema';

import { Truck } from 'src/schemas/Truck.schema';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { CreateTruckDto } from 'src/trucks/dto/CreateTruckDto';
import { CreateBookingDto } from './dto/CreateBooking.dto';
import { AvailabilityService } from 'src/availability/availability.service';

import { UpdateBridgeDto } from 'src/bridge/UpdateBridgeDto';
import { Bridge } from 'src/schemas/Bridge.schema';
import { User } from 'src/schemas/User.shema';

@Injectable()
export class BookingService {
  private readonly logger = new Logger(BookingService.name);

  constructor(
    @InjectModel(Booking.name) private readonly bookingModel: Model<Booking>,
    @InjectModel(Bridge.name) private readonly bridgeModel: Model<Bridge>,
    @InjectModel(Truck.name) private readonly truckModel: Model<Truck>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly openingHoursService: AvailabilityService,
  ) {}

  async createBooking(createBookingDto: CreateBookingDto): Promise<any> {
    const session = await this.bookingModel.startSession();
    session.startTransaction();
    try {
      const user = await this.createUser(session, createBookingDto.user);
      const truck = await this.createTruck(session, createBookingDto.truck);
      const isAvailable = await this.openingHoursService.isNotAvailable(
        createBookingDto.bridgeId,
        createBookingDto.startTime,
        createBookingDto.endTime
      );
      if (!isAvailable) {
        throw new Error('The selected time slot is not available.');
      }

      const booking = await this.createBookingDocument(session, user, truck, createBookingDto);
      this.logger.log(`Booking created: ${JSON.stringify(booking)}`);
      const updateBridgeDto: UpdateBridgeDto = {
        appointments: [
          {
            startDate: createBookingDto.startTime,
            endDate: createBookingDto.endTime,
          },
        ],
      };
      
      console.log('updateBridgeDto:', updateBridgeDto); 
      
      await this.updateBridgeAvailability(createBookingDto.bridgeId, updateBridgeDto);
      
      this.logger.log(`Bridge availability updated for bridge ID: ${createBookingDto.bridgeId}`);

      await session.commitTransaction();
      this.logger.log('Transaction committed successfully.');

      return booking;
    } catch (error) {
      await session.abortTransaction();
      this.logger.error(`Transaction aborted due to error: ${error.message}`);
      throw error;
    } finally {
      session.endSession();
      this.logger.log('Session ended.');
    }
  }

  async createUser(session: any, createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    const savedUser = await user.save({ session });
    this.logger.log(`User saved: ${JSON.stringify(savedUser)}`);
    return savedUser;
  }

  async createTruck(session: any, createTruckDto: CreateTruckDto): Promise<Truck> {
    const truck = new this.truckModel(createTruckDto);
    const savedTruck = await truck.save({ session });
    this.logger.log(`Truck saved: ${JSON.stringify(savedTruck)}`);
    return savedTruck;
  }

  async createBookingDocument(session: any, user: User, truck: Truck, createBookingDto: CreateBookingDto): Promise<Booking> {
    const booking = new this.bookingModel({
      ...createBookingDto,
      user: user,
      truck: truck,
    });
    this.logger.log(`Booking object created: ${JSON.stringify(booking)}`);
    return booking.save({ session });
  }

  async updateBridgeAvailability(bridgeId: string, updateBridgeDto: UpdateBridgeDto): Promise<void> {
    try {
      const updatedBridge = await this.bridgeModel.findByIdAndUpdate(
        bridgeId,
        { $push: { appointments: { $each: updateBridgeDto.appointments } } },
        { new: true }
      ).exec();
  
      if (!updatedBridge) {
        throw new Error(`Bridge with ID ${bridgeId} not found`);
      }
  
      this.logger.log(`Bridge availability updated for ID: ${bridgeId}`);
    } catch (error) {
      this.logger.error(`Error updating bridge availability: ${error.message}`);
      throw error;
    }
  }
    
  
}
