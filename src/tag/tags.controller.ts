import { Controller, Get, Post, Body, Param } from '@nestjs/common';

import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './entities/tag.entity';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  async save(@Body() createTagDto: CreateTagDto): Promise<Tag> {
    return this.tagsService.save(createTagDto);
  }

  @Get('')
  async findAll(): Promise<Tag[]> {
    return this.tagsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Tag> {
    return this.tagsService.findOne(id);
  }
}
