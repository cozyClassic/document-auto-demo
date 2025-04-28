import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { Tag } from './entities/tag.entity';
import { Document } from 'src/documents/entities/document.entity';
import { UserDocumentTagStatus } from 'src/user-documents/entities/user-document-tag-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag, Document, UserDocumentTagStatus])],
  controllers: [TagsController],
  providers: [TagsService],
  exports: [TagsService, TypeOrmModule],
})
export class TagsModule {}
