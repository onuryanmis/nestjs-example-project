import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { Content } from './content.entity';
import { ContentDto } from './dto/content.dto';

@Controller('content')
export class ContentController {
  constructor(private contentService: ContentService) {}

  @Get('/')
  public async index(): Promise<Content[]> {
    return await this.contentService.findAll();
  }

  @Get('/:id')
  public async detail(@Param('id') id: number): Promise<Content> {
    return await this.contentService.findOneOrNotFound(id);
  }

  @Post('/')
  public async create(@Body() contentDto: ContentDto) {
    return await this.contentService.insert(contentDto);
  }

  @Put('/:id')
  public async update(@Param('id') id: number, @Body() contentDto: ContentDto) {
    return this.contentService.update(id, contentDto);
  }

  @Delete('/:id')
  public async delete(@Param('id') id: number) {
    return await this.contentService.remove(id);
  }
}
