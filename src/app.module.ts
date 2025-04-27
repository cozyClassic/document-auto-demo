import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentsModule } from './documents/documents.module';
import { TagsModule } from './tag/tags.module';
import { UserDocumentsModule } from './user-documents/user-documents.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      autoLoadEntities: true,
      synchronize: true,
      entities: [__dirname + '/../**/*.entity.ts}'],
      logging: true,
      dropSchema: true,
    }),
    TagsModule,
    UsersModule,
    DocumentsModule,
    UserDocumentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
