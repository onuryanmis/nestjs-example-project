import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  public async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  public async findOne(id: number): Promise<Category> {
    return this.categoryRepository.findOneBy({ id });
  }

  public async findOneOrNotFound(id: number): Promise<Category> {
    const category = await this.findOne(id);
    if (!category) throw new HttpException('Not Found!', HttpStatus.NOT_FOUND);
    return category;
  }

  public async insert(categoryDto: CategoryDto): Promise<Category> {
    const categoryEntity = this.categoryRepository.create(categoryDto);
    await this.categoryRepository.save(categoryEntity);
    return categoryEntity;
  }

  public async update(
    id: number,
    categoryUpdateDto: CategoryDto,
  ): Promise<Category> {
    const category = await this.findOneOrNotFound(id);

    return await this.categoryRepository.save({
      ...category,
      ...categoryUpdateDto,
    });
  }

  public async remove(id: number) {
    const category = await this.findOneOrNotFound(id);
    return await this.categoryRepository.delete({ id: category.id });
  }
}
