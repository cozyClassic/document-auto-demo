import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserDocumentsService } from './user-documents.service';
import { CreateUserDocumentDto } from './dto/create-user-document.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/rolese.guard';
import { Role } from 'src/auth/roles.enum';
import { Roles } from 'src/auth/roles.decorator';

@Controller('user-documents')
export class UserDocumentsController {
  constructor(private readonly userDocumentsService: UserDocumentsService) {}

  @Post('upload')
  @UseGuards(AuthGuard)
  async uploadFiles(
    @Request() req,
    @Body() requestData: { documents: CreateUserDocumentDto[] },
  ): Promise<any> {
    const userId = req.user.id;
    console.log('USER ID :::', req.user);
    const { documents } = requestData;
    return this.userDocumentsService.saveUserDocuments(
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
    return this.userDocumentsService.updateUserDocumentTagStatus(
      userId,
      tagStatus.documentId,
      tagStatus.tagId,
      tagStatus.status,
    );
  }

  @Get('')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async findAll(): Promise<any> {
    return this.userDocumentsService.findAll();
  }

  @Get('users/:userId')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async findAllByUserId(
    @Request() req,
    @Param('userId') userId: number,
  ): Promise<any> {
    return this.userDocumentsService.findAllUserDocuments(userId);
  }
}
