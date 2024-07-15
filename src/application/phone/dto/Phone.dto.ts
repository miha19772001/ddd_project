import { AutoMap } from '@automapper/classes';

export class PhoneDto {
    @AutoMap()
    number: string;
}
