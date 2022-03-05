import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import { MediaFile } from './media-file.entity';
import { MediaFileRepository } from './media-file.repository';
import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MediaFileService {
  constructor(private configService: ConfigService) {}
  async uploadMediaFile(dataBuffer: Buffer, filename: string) {
    const s3 = new S3({
      endpoint: 'http://127.0.0.1:9000',
      s3ForcePathStyle: true,
      signatureVersion: 'v4',
      secretAccessKey: 'password123',
      accessKeyId: 'sanjeev',
    });
    const result = await s3
      .upload({
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Body: dataBuffer,
        Key: `contents/${uuid()}-${filename}`,
      })
      .promise();
    console.log(result);

    return result;

    // const newMediaFile = this.mediaFileRepository.create({
    //   key: result.Key,
    //   url: result.Location,
    // });

    // await this.mediaFileRepository.save(newMediaFile);
    // return newMediaFile;
  }

  async deleteFile(
    fileKeys: {
      Key: string;
    }[],
  ) {
    const s3 = new S3({});
    await s3
      .deleteObjects({
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Delete: {
          Objects: fileKeys,
          Quiet: false,
        },
      })
      .promise();
    return;
  }
}
