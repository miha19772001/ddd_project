import { Type } from '@nestjs/common';
import { globSync } from 'glob';
import { EntityBase } from '../EntityBase';

export class EntityFactory {
    private static readonly entityBases: Type<any>[] = [];

    public static readonly initialize = {
        useFactory: async () => {
            await EntityFactory.loadEntityBases();
            return EntityFactory.entityBases;
        },
    };

    private static async loadEntityBases() {
        const entityBasePaths: string[] = globSync('src/**/*.entity.ts');

        let entityBasePath: string[];
        let fileName: string[];

        for (let i = 0; i < entityBasePaths.length; i++) {
            const path = entityBasePaths[i];

            entityBasePath = path.split('\\');
            entityBasePath.splice(0, 1, '../../..');

            fileName = entityBasePath[entityBasePath.length - 1].split('.');
            fileName.splice(-1, 1);

            entityBasePath.splice(-1, 1, fileName.join('.'));

            const entityBase: EntityBase = await import(
                entityBasePath.join('/')
            );
            const entityBaseConstructor = Object.values(entityBase)[0];

            if (!entityBaseConstructor) continue;

            this.entityBases.push(entityBaseConstructor);
        }
    }
}
