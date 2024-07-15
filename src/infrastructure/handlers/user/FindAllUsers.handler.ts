import { Injectable } from '@nestjs/common';
import { CreateUserCommandContext } from 'src/application/user/commands/contexts/CreateUserCommandContext';
import { FindAllUsersForm } from 'src/application/user/forms/FindAllUsers.form';
import { FindUserByNameQueryCriteria } from 'src/application/user/queries/criteria/FindUserByNameQueryCriteria';
import { IHandler } from 'src/base/handler/IHandler';
import { CreateUserCommand } from 'src/infrastructure/commands/user/CreateUser.command';
import { FindUserByNameQuery } from 'src/infrastructure/queries/user/FindUserByName.query';
import { UserService } from 'src/infrastructure/services/user/User.service';

@Injectable()
export class FindAllUsersHandler implements IHandler<FindAllUsersForm> {
    constructor(
        private readonly userService: UserService,
        private readonly createUserCommand: CreateUserCommand,
        private readonly findUserByNameQuery: FindUserByNameQuery,
    ) {}

    async execute(form: FindAllUsersForm): Promise<void> {
        console.log(await this.userService.getById(1));

        console.log(
            await this.createUserCommand.execute(
                new CreateUserCommandContext(form.user),
            ),
        );

        console.log(
            await this.findUserByNameQuery.execute(
                new FindUserByNameQueryCriteria(form.user.firstName),
            ),
        );
    }
}
