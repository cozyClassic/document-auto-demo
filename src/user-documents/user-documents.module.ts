import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from 'src/tag/entities/tag.entity';
import { Document } from 'src/documents/entities/document.entity';
import { UserDocumentTagStatus } from 'src/user-documents/entities/user-document-tag-status.entity';
import { UserDocument } from './entities/user-document.entity';
import { UserDocumentsController } from './user-documents.controller';
import { UserDocumentsService } from './user-documents.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Tag,
      Document,
      UserDocument,
      UserDocumentTagStatus,
    ]),
  ],
  controllers: [UserDocumentsController],
  providers: [UserDocumentsService],
  exports: [UserDocumentsService],
})
export class UserDocumentsModule {}
