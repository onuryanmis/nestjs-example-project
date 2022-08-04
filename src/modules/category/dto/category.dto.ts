import { IsBoolean, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsOptional()
  @MaxLength(250)
  description: string;

  @IsBoolean()
  isActive: boolean;
}
