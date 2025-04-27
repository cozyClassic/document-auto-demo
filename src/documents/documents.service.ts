import { Injectable } from '@nestjs/common';
import { Document } from './entities/document.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDocumentDto } from './dto/create-document.dto';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
  ) {}

  findAll(): Promise<Document[]> {
    return this.documentRepository.find();
  }

  save(Document: CreateDocumentDto): Promise<Document> {
    return this.documentRepository.save(Document);
  }
}
