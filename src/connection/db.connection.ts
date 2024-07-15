import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../config/config';

export const db = TypeOrmModule.forRoot({
    type: 'mysql',
    host: config.DB.HOST,
    port: config.DB.PORT,
    username: config.DB.USERNAME,
    password: config.DB.PASSWORD,
    database: config.DB.DATABASE,
    //entities: [...entities],
    synchronize: true,
    autoLoadEntities: true,
});

export function getFeature(entities) {
    const feature = TypeOrmModule.forFeature(entities);
    return feature;
}
