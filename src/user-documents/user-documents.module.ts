import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from 'src/tag/entities/tag.entity';
import { Document } from 'src/documents/entities/document.entity';
import { UserDocumentTagStatus } from 'src/user-documents/entities/user-document-tag-status.entity';
import { UserDocument } from './entities/user-document.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Tag,
      Document,
      UserDocument,
      UserDocumentTagStatus,
    ]),
  ],
  controllers: [],
  providers: [],
})
export class UserDocumentsModule {}
