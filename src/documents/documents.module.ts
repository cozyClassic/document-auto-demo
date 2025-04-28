import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { Document } from './entities/Document.entity';
import { TagsModule } from 'src/tag/tags.module';

@Module({
  imports: [TypeOrmModule.forFeature([Document]), TagsModule],
  providers: [DocumentsService],
  controllers: [DocumentsController],
})
export class DocumentsModule {}
