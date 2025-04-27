import { Body, Controller, Post, Get } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';

@Controller('document')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  async save(@Body() createDocumentDto: CreateDocumentDto) {
    this.documentsService.save(createDocumentDto);
  }

  // get all documents
  @Get('/')
  async findAll() {
    return this.documentsService.findAll();
  }
}
