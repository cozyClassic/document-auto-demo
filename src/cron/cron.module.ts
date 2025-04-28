import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDocumentTagStatus } from 'src/user-documents/entities/user-document-tag-status.entity';
import { DynamicCronService } from './services/dynamic-cron.service';
import { ExternalRequestModule } from 'src/external-requests/external-requests.module';
import { TagsService } from 'src/tag/tags.service';
import { UserDocumentsService } from 'src/user-documents/user-documents.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserDocumentTagStatus]),
    ExternalRequestModule,
  ],
  providers: [DynamicCronService, TagsService, UserDocumentsService],
})
export class CronModule {}
