import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { Category } from '../../category/category.entity';

export class ContentDto {
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsNotEmpty()
  fullContent: string;

  @IsNotEmpty()
  @IsNumber()
  category: Category;

  @IsOptional()
  @MaxLength(250)
  description: string;

  @IsBoolean()
  isActive: boolean;
}
