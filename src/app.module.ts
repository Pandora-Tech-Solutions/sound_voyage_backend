import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { DatabaseConnectionService } from './database/connection.service';
import { CompaniesModule } from './features/companies/companies.module';
import { ItinerariesModule } from './features/itineraries/itineraries.module';
import { LocalsModule } from './features/locals/locals.module';
import { TravelerModule } from './features/traveler/traveler.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [DatabaseModule],
      useFactory: (database: DatabaseConnectionService) => {
        try {
          const mongoUri = database.get();
          return <MongooseModuleOptions>{
            uri: mongoUri,
          };
        } catch (error) {
          throw error;
        }
      },
      inject: [DatabaseConnectionService],
    }),
    CompaniesModule,
    ItinerariesModule,
    LocalsModule,
    TravelerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
