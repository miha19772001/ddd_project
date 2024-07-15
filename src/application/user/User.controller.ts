import { Controller, Get } from '@nestjs/common';
import { FindAllUsersHandler } from 'src/infrastructure/handlers/user/FindAllUsers.handler';
import { FindAllUsersForm } from './forms/FindAllUsers.form';
import { UserService } from 'src/infrastructure/services/user/User.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly findAllUsersHandler: FindAllUsersHandler,
        private readonly userService: UserService,
    ) {}

    @Get('findAll')
    async findAll(id: number) {
        const findAllUsersForm: FindAllUsersForm = new FindAllUsersForm(
            await this.userService.getById(id),
        );
        this.findAllUsersHandler.execute(findAllUsersForm);
    }
}
