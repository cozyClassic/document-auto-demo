import { Injectable } from '@nestjs/common';
import { Document } from './entities/document.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDocumentDto } from './dto/create-document.dto';
import { TagsService } from 'src/tag/tags.service';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,

    private readonly tagsService: TagsService,
  ) {}

  findAll(): Promise<Document[]> {
    return this.documentRepository.find({
      relations: ['tags'],
    });
  }

  save(Document: CreateDocumentDto): Promise<Document> {
    return this.documentRepository.save(Document);
  }

  async updateDocumentTags(
    documentId: number,
    tagIds: number[],
  ): Promise<Document> {
    const document = await this.documentRepository.findOne({
      where: { id: documentId },
      relations: ['tags'],
    });

    if (!document) {
      throw new Error('Document not found');
    }

    // check if the tags exist
    const tags = await this.tagsService.findByInIds(tagIds);
    if (tags.length !== tagIds.length) {
      throw new Error('Some tags not found');
    }
    // add the new tags to the document

    document.tags = tagIds.map((tagId) => ({ id: tagId }) as any);

    return await this.documentRepository.save(document);
  }
}
