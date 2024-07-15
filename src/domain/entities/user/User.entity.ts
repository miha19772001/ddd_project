import { AutoMap } from '@automapper/classes';
import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Phone } from '../phone/Phone.entity';

@Entity('user')
export class User {
    @AutoMap()
    @PrimaryGeneratedColumn({ type: 'int', name: 'Id' })
    id: number;

    @AutoMap()
    @Column({ type: 'varchar', name: 'Login' })
    login: string;

    @AutoMap()
    @Column({ type: 'varchar', name: 'FirstName' })
    firstName: string;

    @AutoMap(() => Phone)
    @OneToOne(() => Phone, (phone) => phone.id, { eager: true })
    @JoinColumn({ name: 'PhoneId' })
    phone: Phone;
}
