import { AutoMap } from '@automapper/classes';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('phone')
export class Phone {
    @PrimaryGeneratedColumn({ type: 'int', name: 'Id' })
    id: number;

    @AutoMap()
    @Column({ type: 'varchar', name: 'Number' })
    number: string;
}
