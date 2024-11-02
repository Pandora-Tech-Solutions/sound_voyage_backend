import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumberString, IsOptional, IsString } from 'class-validator';

export class QueryDto {
  @IsOptional()
  @IsNumberString()
  @ApiProperty({ required: false })
  page?: number;

  @IsOptional()
  @IsNumberString()
  @ApiProperty({ required: false })
  limit?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  search?: string;

  @IsOptional()
  @IsDate()
  @ApiProperty({ required: false })
  dateInit?: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty({ required: false })
  dateEnd?: Date;
}
