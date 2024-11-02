import { Module } from '@nestjs/common';
import { LocalsService } from './locals.service';
import { LocalsController } from './locals.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LocalSchema } from './entities/local.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Local',
        schema: LocalSchema,
      },
    ]),
  ],
  controllers: [LocalsController],
  providers: [LocalsService],
})
export class LocalsModule {}
