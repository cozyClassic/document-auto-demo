import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentsModule } from './documents/documents.module';
import { TagsModule } from './tag/tags.module';
import { UserDocumentsModule } from './user-documents/user-documents.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronModule } from './cron/cron.module';
import { ExternalRequestModule } from './external-requests/external-requests.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      autoLoadEntities: true,
      synchronize: true,
      entities: [__dirname + '/../**/*.entity.ts}'],
      logging: true,
    }),
    TagsModule,
    UsersModule,
    DocumentsModule,
    UserDocumentsModule,
    AuthModule,
    ScheduleModule.forRoot(),
    ExternalRequestModule,
    CronModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
