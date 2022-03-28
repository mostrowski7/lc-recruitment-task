import {
  Controller,
  HttpException,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileService } from './file.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import EncryptFileDto from './Dto/EncryptFileDto';
import EncryptFileResponse from './Dto/EncryptFileResponse';

@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @UseGuards(JwtAuthGuard)
  @Post('encrypt')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'file', maxCount: 1 },
        { name: 'key', maxCount: 1 },
      ],
      {
        fileFilter: (req, file, callback) => {
          const extension = file.originalname.split('.').pop();
          const name = file.fieldname;
          if (
            (name === 'file' && extension === 'pdf') ||
            (name === 'key' && extension === 'pem')
          ) {
            return callback(null, true);
          }
          return callback(new HttpException('Wrong extension', 400), false);
        },
      },
    ),
  )
  @ApiTags('API')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Files',
    type: EncryptFileDto,
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Success',
    type: EncryptFileResponse,
  })
  @ApiResponse({ status: 400, description: 'Wrong extension' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async encryptFile(
    @UploadedFiles()
    files: {
      file: Express.Multer.File[];
      key: Express.Multer.File[];
    },
  ) {
    return this.fileService.encryptFile(files);
  }
}
