import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindUserByNameQueryCriteria } from 'src/application/user/queries/criteria/FindUserByNameQueryCriteria';
import { User } from 'src/domain/entities/user/User.entity';
import { UserService } from 'src/infrastructure/services/user/User.service';

@QueryHandler(FindUserByNameQueryCriteria)
export class FindUserByNameQuery
    implements IQueryHandler<FindUserByNameQueryCriteria>
{
    constructor(private readonly userService: UserService) {}

    async execute(query: FindUserByNameQueryCriteria): Promise<User> {
        console.log('FindUserByNameQuery');
        return this.userService.getByName(query.name);
    }
}
