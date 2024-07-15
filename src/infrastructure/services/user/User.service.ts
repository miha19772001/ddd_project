import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IService } from 'src/base/service/IService';
import { User } from 'src/domain/entities/user/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService implements IService<User> {
    constructor(
        @InjectRepository(User)
        private _repository: Repository<User>,
    ) {}

    public async add(entity: User): Promise<User> {
        return this._repository.save(entity);
    }

    public async getAll(): Promise<User[]> {
        console.log('adsf');
        return this._repository.find();
    }

    public async getById(id: number): Promise<User> {
        return this._repository.findOne({ where: { id: id } });
    }

    public async remove(entity: User): Promise<User> {
        return this._repository.remove(entity);
    }

    public async getByName(name: string): Promise<User> {
        return this._repository.findOne({ where: { firstName: name } });
    }
}
