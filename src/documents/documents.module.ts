import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { Document } from './entities/Document.entity';
import { Tag } from 'src/tag/entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Document, Tag])],
  providers: [DocumentsService],
  controllers: [DocumentsController],
})
export class DocumentsModule {}
