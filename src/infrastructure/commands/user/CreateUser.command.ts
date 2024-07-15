import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommandContext } from 'src/application/user/commands/contexts/CreateUserCommandContext';
import { User } from 'src/domain/entities/user/User.entity';
import { UserService } from 'src/infrastructure/services/user/User.service';

@CommandHandler(CreateUserCommandContext)
export class CreateUserCommand
    implements ICommandHandler<CreateUserCommandContext>
{
    constructor(private readonly userService: UserService) {}

    async execute(command: CreateUserCommandContext): Promise<User> {
        console.log('CreateUserCommand');
        return this.userService.add(command.user);
    }
}
