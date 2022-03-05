import { EntityRepository, Repository } from 'typeorm';
import { Content } from './content.entity';
import { GetContentFilterDto } from './dto/get-content-filter.dto';

@EntityRepository(Content)
export class ContentRepository extends Repository<Content> {
  async getContent(filterDto: GetContentFilterDto): Promise<Content[]> {
    const { search, type } = filterDto;

    // const query = this.createQueryBuilder('content').leftJoinAndSelect(
    //   'content.votes',
    //   'votes',
    // );
    const query = this.createQueryBuilder('content')
      .leftJoinAndSelect('content.votes', 'votes')
      .leftJoinAndSelect('content.mediaFiles', 'media_file');
    //   .loadRelationCountAndMap('content.votesa', 'content.votes');

    if (search) {
      query.andWhere('(LOWER(content.text) LIKE LOWER(:search))', {
        search: `%${search}%`,
      });
    }

    if (type) {
      query.andWhere('content.type = :type', { type });
    }

    const content = await query.getMany();
    return content;
  }
}
