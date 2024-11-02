import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class GeolocationDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  lat: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  lng: number;
}

export class HistoryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  language: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  text: string;

  @IsOptional()
  @IsArray()
  @ApiProperty()
  images?: string[];

  @IsOptional()
  @IsUrl()
  @ApiProperty()
  audio?: string;

  @IsOptional()
  @IsUrl()
  @ApiProperty()
  video?: string;
}

export class CreateLocalDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  geolocation: GeolocationDto;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  itinerary: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description?: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  histories: HistoryDto[];
}
