import { Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { BookingsModule } from './bookings/bookings.module';
import { CalendarModule } from './bookings/calendar/calendar.module';
import { UsersModule } from './users/users.module';

dotenv.config(); 

@Module({
  imports: [MongooseModule.forRoot(process.env.DATABASE_URL),BookingsModule,CalendarModule,UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
