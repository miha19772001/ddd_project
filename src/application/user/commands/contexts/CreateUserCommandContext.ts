import { User } from 'src/domain/entities/user/User.entity';

export class CreateUserCommandContext {
    constructor(public readonly user: User) {}
}
