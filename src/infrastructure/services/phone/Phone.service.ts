import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IService } from 'src/base/service/IService';
import { Phone } from 'src/domain/entities/phone/Phone.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PhoneService implements IService<Phone> {
    constructor(
        @InjectRepository(Phone)
        private _repository: Repository<Phone>,
    ) {}

    public async add(entity: Phone): Promise<Phone> {
        return this._repository.save(entity);
    }

    public async getAll(): Promise<Phone[]> {
        return this._repository.find();
    }

    public async getById(id: number): Promise<Phone> {
        return this._repository.findOne({ where: { id: id } });
    }

    public async remove(entity: Phone): Promise<Phone> {
        return this._repository.remove(entity);
    }
}
