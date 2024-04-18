import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.shema';
import { Booking } from 'src/schemas/Booking.schema';
import { CreateBookingDto } from './dto/CreateBooking.dto';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { Bridge } from 'src/schemas/Bridge.schéma';
import { CreateBridgeDto } from 'src/bridge/CreateBridgeDto';
import { OpeningHoursService } from 'src/openingHours/openingHours.service';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Booking.name) private readonly bookingModel: Model<Booking>,
    @InjectModel(Bridge.name) private readonly bridgeModel: Model<Bridge>,
    private readonly openingHoursService: OpeningHoursService,

  ) {}

  async createBooking(createBookingDto: CreateBookingDto): Promise<any> {
    const session = await this.bookingModel.startSession();
    session.startTransaction();
    try {
      const user = await this.createUser(session, createBookingDto.user);
      const isAvailable = this.openingHoursService.isAvailable(createBookingDto.startTime, createBookingDto.endTime);
      if (!isAvailable) {
        throw new Error('The selected time slot is not available.');
      }
      const booking = await this.createBookingDocument(session, user._id, user.truck._id, createBookingDto);
      await this.updateBridgeAvailability(createBookingDto.bridge);
      await session.commitTransaction();
      return booking;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async createUser(session: any, createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    return user.save({ session });
  }

  async createBookingDocument(session: any, userId: string, truckId: string, createBookingDto: CreateBookingDto): Promise<Booking> {
    const booking = new this.bookingModel({
      ...createBookingDto,
      user: userId,
      truck: truckId,
      startTime: createBookingDto.startTime, 
      endEime: createBookingDto.endTime
    });
    return booking.save({ session });
  }


  async updateBridgeAvailability(bridge: CreateBridgeDto): Promise<void> {
    await this.bridgeModel.updateOne({ _id: bridge }, { available: false }).exec();
  }
}
