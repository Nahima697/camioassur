import { Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { BookingsModule } from './bookings/bookings.module';
import { CalendarModule } from './bookings/calendar/calendar.module';

dotenv.config(); 

@Module({
  imports: [MongooseModule.forRoot(process.env.DATABASE_URL),BookingsModule,CalendarModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
