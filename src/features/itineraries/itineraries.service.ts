import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateItineraryDto } from './dto/create-itinerary.dto';
import { UpdateItineraryDto } from './dto/update-itinerary.dto';
import { InjectModel } from '@nestjs/mongoose';
import { IItineraryEntity } from './entities/itinerary.entity';
import { Model } from 'mongoose';
import { ItineraryQueryDto } from './dto/query-itinerary.dto';

@Injectable()
export class ItinerariesService {
  constructor(
    @InjectModel('Itinerary') private itineraryModel: Model<IItineraryEntity>,
  ) {}

  async create(createItineraryDto: CreateItineraryDto) {
    try {
      return (await this.itineraryModel.create(createItineraryDto)).populate(
        'company',
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(query: ItineraryQueryDto) {
    try {
      let data = {};
      const page = query.page ? Number(query.page) : 1;
      const limit = query.limit ? Number(query.limit) : 10;
      const skip = (page - 1) * limit;

      if (query.search) {
        data = {
          ...data,
          $or: [
            { name: { $regex: query.search, $options: 'i' } },
            { description: { $regex: query.search, $options: 'i' } },
          ],
        };
      }

      const itineraries = await this.itineraryModel
        .find(data)
        .populate('company')
        .limit(limit)
        .skip(skip);

      const total = await this.itineraryModel.countDocuments(data);

      return {
        data: itineraries,
        total,
        page,
        limit,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      return await this.itineraryModel.findById(id).populate('company');
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateItineraryDto: UpdateItineraryDto) {
    try {
      return await this.itineraryModel
        .findByIdAndUpdate(id, updateItineraryDto, {
          new: true,
        })
        .populate('company');
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      return await this.itineraryModel.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
