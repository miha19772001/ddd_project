import { User } from 'src/domain/entities/user/User.entity';

export class FindAllUsersForm {
    constructor(public readonly user: User) {}
}