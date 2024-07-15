import { createMap, forMember, mapFrom } from '@automapper/core';
import { mapper } from 'src/connection/mapper';
import { User } from 'src/domain/entities/user/User.entity';
import { FindAllUsersDto } from './dto/FindAllUsers.dto';

export class UserProfile {
    constructor() {
        createMap(
            mapper,
            User,
            FindAllUsersDto,
            forMember(
                (destination) => destination.name,
                mapFrom((source) => source.firstName),
            ),
        );
    }
}
