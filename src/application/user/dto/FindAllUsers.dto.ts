import { AutoMap } from '@automapper/classes';
import { PhoneDto } from 'src/application/phone/dto/Phone.dto';

export class FindAllUsersDto {
    @AutoMap()
    public id: number;

    @AutoMap()
    public login: string;

    @AutoMap()
    public name: string;

    @AutoMap(() => PhoneDto)
    public phone: PhoneDto;

    // @AutoMap(() => [Address])
    // addresses: Address[] = [];
}
