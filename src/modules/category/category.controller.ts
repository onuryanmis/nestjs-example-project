import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { CategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('/')
  public async index(): Promise<Category[]> {
    return await this.categoryService.findAll();
  }

  @Get('/:id')
  public async detail(@Param('id') id: number): Promise<Category> {
    return await this.categoryService.findOneOrNotFound(id);
  }

  @Post('/')
  public async create(@Body() categoryDto: CategoryDto) {
    return await this.categoryService.insert(categoryDto);
  }

  @Put('/:id')
  public async update(
    @Param('id') id: number,
    @Body() categoryDto: CategoryDto,
  ) {
    return this.categoryService.update(id, categoryDto);
  }

  @Delete('/:id')
  public async delete(@Param('id') id: number) {
    return await this.categoryService.remove(id);
  }
}
