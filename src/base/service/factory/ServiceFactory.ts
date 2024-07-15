import { Injectable, Provider } from '@nestjs/common';
import { globSync } from 'glob';

@Injectable()
export class ServiceFactory {
    private static readonly services: Provider[] = [];

    public static readonly provider = {
        provide: 'serviceFactory',
        useFactory: async () => {
            ServiceFactory.loadServices();
            return ServiceFactory.services;
        },
    };

    private static async loadServices() {
        const servicePaths: string[] = globSync('src/**/*.service.ts');

        let servicePath: string[];
        let fileName: string[];

        servicePaths.map(async (path) => {
            servicePath = path.split('\\');
            servicePath.splice(0, 1, '../../..');

            fileName = servicePath[servicePath.length - 1].split('.');
            fileName.splice(-1, 1);

            servicePath.splice(-1, 1, fileName.join('.'));

            //let service: IEntityService<EntityBase> = await import(servicePath.join('/'));
            let service: Provider = await import(servicePath.join('/'));

            this.services.push(Object.values(service)[0]);
        });
    }
}
