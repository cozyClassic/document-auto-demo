import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  findAll(): Promise<Tag[]> {
    return this.tagRepository.find();
  }

  findOne(id: number): Promise<Tag> {
    return this.tagRepository.findOneBy({ id });
  }

  findByInIds(ids: number[]): Promise<Tag[]> {
    return this.tagRepository.findBy({ id: In(ids) });
  }

  findTagsForCron(): Promise<Tag[]> {
    return this.tagRepository.find({
      where: { isActive: true, isInstant: false },
    });
  }

  save(tag: CreateTagDto): Promise<Tag> {
    return this.tagRepository.save(tag);
  }
}
