import { EntityRepository, Repository } from 'typeorm';
import { Comments } from './comments.entity';

@EntityRepository(Comments)
export class CommentsRepository extends Repository<Comments> {}
