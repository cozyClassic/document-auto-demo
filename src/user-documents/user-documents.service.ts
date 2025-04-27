import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { UserDocument } from './entities/user-document.entity';
import { UserDocumentTagStatus } from './entities/user-document-tag-status.entity';
import { CreateUserDocumentDto } from './dto/create-user-document.dto';
import { UserDocumentTagStatusCreateInput } from './interfaces/user-document-tag-status.interface';

@Injectable()
export class UserDocumentService {
  constructor(
    @InjectRepository(UserDocument)
    private userDocumentRepository: Repository<UserDocument>,

    @InjectRepository(UserDocumentTagStatus)
    private userDocumentTagStatusRepository: Repository<UserDocumentTagStatus>,
    private dataSource: DataSource,
  ) {}

  async saveUserDocuments(documents: CreateUserDocumentDto[]): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    // Start transaction
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const userDocumentRepo = queryRunner.manager.getRepository(UserDocument);
      const tagStatusRepo = queryRunner.manager.getRepository(
        UserDocumentTagStatus,
      );

      const savedUserDocuments = await userDocumentRepo.save(documents);

      // 상위테이블 documents와 연결되어 있는 tag 각각에 대하여
      // document별로 모든 user-documents-tag-status를 생성한다.
      const userDocumentTagStatusList: UserDocumentTagStatusCreateInput[] = [];

      for (const userDocument of savedUserDocuments) {
        if (userDocument.document?.tags?.length) {
          const tagStatuses = userDocument.document.tags.map((tag) => ({
            documentId: userDocument.id,
            tagId: tag.id,
            status: 'pending',
          }));

          userDocumentTagStatusList.push(...tagStatuses);
        }
      }

      // Save tag statuses within the same transaction
      if (userDocumentTagStatusList.length > 0) {
        await tagStatusRepo.save(userDocumentTagStatusList);
      }

      // If everything succeeds, commit the transaction
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error('Failed to save user documents');
    } finally {
      // Release the query runner which is manually created
      await queryRunner.release();
    }
  }

  async updateUserDocumentTagStatus(
    userId: number,
    documentId: number,
    tagId: number,
    status: string,
  ): Promise<void> {
    const userDocument = await this.userDocumentRepository.findOne({
      where: {
        document: { id: documentId },
        user: { id: userId },
      },
      relations: ['document', 'user', 'tagStatuses'], // 필요한 관계를 로드
    });

    const tagStatus = await this.userDocumentTagStatusRepository.findOne({
      where: {
        userDocument: { id: userDocument.id },
        tag: { id: tagId },
      },
    });

    if (tagStatus) {
      tagStatus.status = status;
      await this.userDocumentTagStatusRepository.save(tagStatus);
    } else {
      throw new Error('Tag status not found');
    }
  }
}
