import { EntityRepository, Repository } from 'typeorm';

import { Votes } from './vote.entity';

@EntityRepository(Votes)
export class VotesRepository extends Repository<Votes> {}
