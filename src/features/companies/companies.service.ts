import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ICompanyEntity } from './entities/Company.entity';
import { Model } from 'mongoose';
import { CompanyQueryDto } from './dto/query-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel('Company')
    private readonly companyModel: Model<ICompanyEntity>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    try {
      return await this.companyModel.create(createCompanyDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(query: CompanyQueryDto) {
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

      const companies = await this.companyModel
        .find(data)
        .limit(limit)
        .skip(skip);

      const total = await this.companyModel.countDocuments(data);

      return {
        data: companies,
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
      return await this.companyModel.findById(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    try {
      return await this.companyModel.findByIdAndUpdate(id, updateCompanyDto, {
        new: true,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      return await this.companyModel.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
