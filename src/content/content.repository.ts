import { EntityRepository, Repository } from 'typeorm';
import { Content } from './content.entity';

@EntityRepository(Content)
export class ContentRepository extends Repository<Content> {}
