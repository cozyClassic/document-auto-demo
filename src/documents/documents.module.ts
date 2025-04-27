import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { Document } from './entities/Document.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Document])],
  providers: [DocumentsService],
  controllers: [DocumentsController],
})
export class DocumentsModule {}
