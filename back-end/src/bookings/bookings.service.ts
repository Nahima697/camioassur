import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.shema'; 
import { Truck } from 'src/schemas/Truck.schema';
import { Booking } from 'src/schemas/Booking.schema';
import { CreateBookingDto } from './dto/CreateBooking.dto';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { CreateTruckDto } from 'src/trucks/dto/CreateTruckDto';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Truck.name) private readonly truckModel: Model<Truck>,
    @InjectModel(Booking.name) private readonly bookingModel: Model<Booking>,
  ) {}

  async createBooking(createBookingDto: CreateBookingDto): Promise<any> {
    const session = await this.bookingModel.startSession();
    session.startTransaction();
    try {
      const user = await this.createUser(session, createBookingDto.user);
      const truck = await this.createTruck(session, createBookingDto.truck);
      const booking = await this.createBookingDocument(session, user._id, truck._id, createBookingDto);
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

  async createTruck(session: any, createTruckDto: CreateTruckDto): Promise<Truck> {
    const truck = new this.truckModel(createTruckDto);
    return truck.save({ session });
  }

  async createBookingDocument(session: any, userId: string, truckId: string, createBookingDto: CreateBookingDto): Promise<Booking> {
    const booking = new this.bookingModel({
      ...createBookingDto,
      user: userId,
      truck: truckId,
    });
    return booking.save({ session });
  }
}
