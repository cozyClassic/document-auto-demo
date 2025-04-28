import { Injectable, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { ExternalRequestService } from 'src/external-requests/external-requests.service';
import { TagsService } from 'src/tag/tags.service';
import { UserDocumentTagStatus } from 'src/user-documents/entities/user-document-tag-status.entity';
import { UserDocumentsService } from 'src/user-documents/user-documents.service';

@Injectable()
export class DynamicCronService implements OnModuleInit {
  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly externalRequestService: ExternalRequestService,
    private readonly tagsService: TagsService,
    private readonly userDocumentsSevice: UserDocumentsService,
  ) {}

  async onModuleInit() {
    await this.loadCronJobsFromDb();
  }

  async loadCronJobsFromDb() {
    const tags = await this.tagsService.findTagsForCron();

    for (const tag of tags) {
      this.addCronJob(tag.id, tag.cronExpression);
    }
  }

  addCronJob(tagId: number, cronExpression: string) {
    const job = new CronJob(cronExpression, async () => {
      await this.handleTagJob(tagId);
    });

    this.schedulerRegistry.addCronJob(`tag-cron-${tagId}`, job);
    job.start();
  }

  async handleTagJob(tagId: number) {
    const dataList: UserDocumentTagStatus[] =
      await this.userDocumentsSevice.findPendingByTagId(tagId);

    if (dataList.length === 0) {
      console.log(`No tasks for tag ${tagId}`);
      return;
    }

    for (const data of dataList) {
      await this.externalRequestService.requestToExternalServer(tagId, {
        tagStatusId: data.id,
        userDocumentId: data.userDocument.id,
        userDocumentFilePath: data.userDocument.filePath,
      });
      // 필요하면 taskDataService.updateStatus(data.id, 'completed') 이런 것도 할 수 있음
    }
  }
  removeCronJob(tagId: number) {
    this.schedulerRegistry.deleteCronJob(`tag-cron-${tagId}`);
  }
}
