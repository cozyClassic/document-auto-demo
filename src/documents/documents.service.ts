import { Injectable } from '@nestjs/common';
import { Document } from './entities/document.entity';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDocumentDto } from './dto/create-document.dto';
import { Tag } from 'src/tag/entities/tag.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,

    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  findAll(): Promise<Document[]> {
    return this.documentRepository.find();
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
    const tags = await this.tagRepository.findBy({
      id: In(tagIds),
    });
    if (tags.length !== tagIds.length) {
      throw new Error('Some tags not found');
    }
    // add the new tags to the document

    document.tags = tagIds.map((tagId) => ({ id: tagId }) as any);

    return this.documentRepository.save(document);
  }
}
