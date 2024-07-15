import { DynamicModule, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { db, getFeature } from './connection/db.connection.js';
import { ControllerFactory } from './base/controller/factory/ControllerFactory';
import { ServiceFactory } from './base/service/factory/ServiceFactory.js';
import { ProfileFactory } from './base/profile/factory/ProfileFactory.js';
import { EntityFactory } from './base/entity/factory/EntityFactory.js';
import { HandlerFactory } from './base/handler/factory/HandlerFactory.js';
import { CommandFactory } from './base/command/factory/CommandFactory.js';
import { QueryFactory } from './base/query/factory/QueryFactory.js';

@Module({})
export class AppModule {
    static async asyncForRoot(): Promise<DynamicModule> {
        const queries = await QueryFactory.provider.useFactory();
        const commands = await CommandFactory.provider.useFactory();
        const services = await ServiceFactory.provider.useFactory();
        const handlers = await HandlerFactory.provider.useFactory();

        const controllers = await ControllerFactory.initialize.useFactory();

        const profiles = await ProfileFactory.initialize.useFactory();

        const entities = await EntityFactory.initialize.useFactory();
        const feature = getFeature(entities);

        return {
            imports: [CqrsModule, db, feature, ...profiles],
            module: AppModule,
            providers: [...services, ...handlers, ...commands, ...queries],
            controllers: controllers,
            exports: [...services, ...handlers, ...commands, ...queries],
        };
    }
}
