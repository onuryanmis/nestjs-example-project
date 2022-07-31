import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from './content.entity';
import { ContentDto } from './dto/content.dto';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
  ) {}

  public async findAll(): Promise<Content[]> {
    return this.contentRepository.find({
      relations: {
        category: true,
      },
    });
  }

  public async findOne(id: number): Promise<Content> {
    return this.contentRepository.findOne({
      where: { id },
      relations: {
        category: true,
      },
    });
  }

  public async findOneOrNotFound(id: number): Promise<Content> {
    const content = await this.findOne(id);
    if (!content) throw new HttpException('Not Found!', HttpStatus.NOT_FOUND);
    return content;
  }

  public async insert(contentDto: ContentDto): Promise<Content> {
    const contentEntity = this.contentRepository.create(contentDto);
    await this.contentRepository.save(contentEntity);
    return contentEntity;
  }

  public async update(
    id: number,
    contentUpdateDto: ContentDto,
  ): Promise<Content> {
    const content = await this.findOneOrNotFound(id);

    return await this.contentRepository.save(
      Object.assign(content, contentUpdateDto),
    );
  }

  public async remove(id: number) {
    const content = await this.findOneOrNotFound(id);
    return await this.contentRepository.delete({ id: content.id });
  }
}
