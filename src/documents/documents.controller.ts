import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Put,
  Param,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/auth/roles.enum';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/rolese.guard';

@Controller('document')
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.Admin)
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  async save(@Body() createDocumentDto: CreateDocumentDto) {
    return this.documentsService.save(createDocumentDto);
  }

  // get all documents
  @Get('/')
  async findAll() {
    return this.documentsService.findAll();
  }

  @Put(':id/tags')
  async updateDocumentTags(
    @Param('id') documentId: number,
    @Body('tagIds') tagIds: number[],
  ) {
    return this.documentsService.updateDocumentTags(documentId, tagIds);
  }
}
