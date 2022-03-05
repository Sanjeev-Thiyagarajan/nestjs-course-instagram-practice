import { EntityRepository, Repository } from 'typeorm';

import { MediaFile } from './media-file.entity';

@EntityRepository(MediaFile)
export class MediaFileRepository extends Repository<MediaFile> {}
