import { createMap } from '@automapper/core';
import { mapper } from 'src/connection/mapper';
import { Phone } from 'src/domain/entities/phone/Phone.entity';
import { PhoneDto } from './dto/Phone.dto';

export class PhoneProfile {
    constructor() {
        createMap(mapper, Phone, PhoneDto);
    }
}
