import { Module } from '@nestjs/common';
import { TravelerService } from './traveler.service';
import { TravelerController } from './traveler.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TravelerSchema } from './entities/traveler.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Traveler', schema: TravelerSchema }]),
  ],
  controllers: [TravelerController],
  providers: [TravelerService],
})
export class TravelerModule {}
