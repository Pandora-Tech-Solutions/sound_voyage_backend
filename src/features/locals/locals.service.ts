import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLocalDto } from './dto/create-local.dto';
import { UpdateLocalDto } from './dto/update-local.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ILocalEntity } from './entities/local.entity';
import { Model } from 'mongoose';
import { LocalQueryDto } from './dto/query-local.dto';

@Injectable()
export class LocalsService {
  constructor(
    @InjectModel('Local') private readonly localModel: Model<ILocalEntity>,
  ) {}

  async create(createLocalDto: CreateLocalDto) {
    try {
      return await this.localModel.create(createLocalDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(query: LocalQueryDto) {
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

      const locals = await this.localModel.find(data).limit(limit).skip(skip);
      const total = await this.localModel.countDocuments(data);

      return {
        data: locals,
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
      return await this.localModel.findById(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateLocalDto: UpdateLocalDto) {
    try {
      return await this.localModel.findByIdAndUpdate(id, updateLocalDto, {
        new: true,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      return await this.localModel.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
