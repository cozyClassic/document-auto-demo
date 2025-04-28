import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, In } from 'typeorm';
import { UserDocument } from './entities/user-document.entity';
import { UserDocumentTagStatus } from './entities/user-document-tag-status.entity';
import { CreateUserDocumentDto } from './dto/create-user-document.dto';
import { TagsService } from 'src/tag/tags.service';
import { ExternalRequestService } from 'src/external-requests/external-requests.service';

@Injectable()
export class UserDocumentsService {
  constructor(
    @InjectRepository(UserDocument)
    private userDocumentRepository: Repository<UserDocument>,

    @InjectRepository(UserDocumentTagStatus)
    private userDocumentTagStatusRepository: Repository<UserDocumentTagStatus>,
    private dataSource: DataSource,
    private readonly tagsService: TagsService,

    private readonly externalRequestService: ExternalRequestService,
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

      // 1. UserDocument 저장
      const savedUserDocuments = await userDocumentRepo.save(documents);
      const savedIds = savedUserDocuments.map((doc) => doc.id);

      // 2. 저장된 UserDocument를 관계(document.tags 포함)까지 조회
      const userDocuments = await userDocumentRepo.find({
        where: { id: In(savedIds) },
        relations: { document: { tags: true } },
      });

      // 상위테이블 documents와 연결되어 있는 tag 각각에 대하여
      // document별로 모든 user-documents-tag-status를 생성한다.

      // 3. UserDocumentTagStatus 리스트 생성
      let userDocumentTagStatusList = userDocuments.flatMap(
        ({ id: documentId, document, filePath }) =>
          (document?.tags || []).map(({ id: tagId }) => ({
            userDocument: { id: documentId, filePath },
            tag: { id: tagId },
            status: 'pending',
          })),
      );

      // 4. UserDocumentTagStatus 저장
      if (userDocumentTagStatusList.length > 0) {
        userDocumentTagStatusList = await tagStatusRepo.save(
          userDocumentTagStatusList,
        );
      }

      // isInstant = true인 tag를 달고있는 userDocumentTagStatus에 대해서는
      // 즉시 요청을 보낸다.
      const instantTagMap = (await this.tagsService.findInstantTags()).reduce(
        (acc, tag) => {
          acc[tag.id] = true;
          return acc;
        },
        {} as Record<string, true>,
      );

      for (const userDocumentTagStatus of userDocumentTagStatusList) {
        if (userDocumentTagStatus.tag.id in instantTagMap) {
          if ('id' in userDocumentTagStatus) {
            await this.externalRequestService.requestToExternalServer(
              userDocumentTagStatus.tag.id,
              {
                tagStatusId: userDocumentTagStatus.id,
                userDocumentId: userDocumentTagStatus.userDocument.id,
                userDocumentFilePath:
                  userDocumentTagStatus.userDocument.filePath,
              },
            );
          }
        }
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

  async findAllUserDocuments(userId: number): Promise<UserDocument[]> {
    return this.userDocumentRepository.find({
      where: { user: { id: userId } },
      relations: ['document', 'tagStatuses'],
    });
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userDocumentRepository.find({
      relations: ['document', 'tagStatuses'],
    });
  }

  async findPendingByTagId(tagId: number): Promise<UserDocumentTagStatus[]> {
    return this.userDocumentTagStatusRepository.find({
      where: { tag: { id: tagId }, status: 'pending' },
      relations: ['userDocument', 'userDocument.document'],
    });
  }
}
