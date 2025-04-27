import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UserDocumentService } from './user-documents.service';
import { CreateUserDocumentDto } from './dto/create-user-document.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user-document')
export class UserDocumentController {
  constructor(private readonly userDocumentService: UserDocumentService) {}

  @Post('upload')
  @UseGuards(AuthGuard)
  async uploadFiles(
    @Request() req,
    documents: CreateUserDocumentDto[],
  ): Promise<any> {
    const userId = req.user.id;
    this.userDocumentService.saveUserDocuments(
      documents.map((doc) => ({
        ...doc,
        userId,
      })),
    );
  }

  @Post('update-tag-status')
  async updateTagStatus(
    @Request() req,
    tagStatus: { documentId: number; tagId: number; status: string },
  ): Promise<any> {
    const userId = req.user.id;
    return this.userDocumentService.updateUserDocumentTagStatus(
      userId,
      tagStatus.documentId,
      tagStatus.tagId,
      tagStatus.status,
    );
  }
}
