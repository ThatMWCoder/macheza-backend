import {
  Get,
  Param,
  Res,
  UploadedFile,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';

@Controller('')
export class UploadController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename(_, file, callback) {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file) {
    console.log(file);
    return {
      url: `http://localhost:5000/api/${file.path}`,
    };
  }

  @Get('uploads/:path')
  async getImage(@Param('path') path: any, @Res() res: Response) {
    res.sendFile(path, { root: 'uploads' });
  }
}
