import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTravelerDto } from './dto/create-traveler.dto';
import { UpdateTravelerDto } from './dto/update-traveler.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Traveler } from './types/Traveler';
import { TravelerQueryDto } from './dto/query-traveler.dto';

@Injectable()
export class TravelerService {
  constructor(
    @InjectModel('Traveler') private readonly travelerModel: Model<Traveler>,
  ) {}

  async create(createTravelerDto: CreateTravelerDto) {
    try {
      return await (
        await this.travelerModel.create(createTravelerDto)
      ).populate('itineraries');
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(query: TravelerQueryDto) {
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
            { email: { $regex: query.search, $options: 'i' } },
          ],
        };
      }

      const travelers = await this.travelerModel
        .find(data)
        .limit(limit)
        .skip(skip)
        .populate('itineraries');

      const total = await this.travelerModel.countDocuments(data);

      return {
        data: travelers,
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
      return await this.travelerModel.findById(id).populate('itineraries');
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateTravelerDto: UpdateTravelerDto) {
    try {
      return await this.travelerModel
        .findByIdAndUpdate(id, updateTravelerDto, {
          new: true,
        })
        .populate('itineraries');
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      return await this.travelerModel.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
