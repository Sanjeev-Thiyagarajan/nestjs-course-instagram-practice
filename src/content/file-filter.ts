import { BadRequestException, HttpException } from '@nestjs/common';

export const contentFileFilter = (req, file, callback) => {
  const fileType = file.mimetype.split('/')[0];
  console.log(fileType);
  if (fileType !== 'video' && fileType !== 'image') {
    return callback(
      new BadRequestException('File must be an image or a video'),
      false,
    );
  }
  callback(null, true);
};
