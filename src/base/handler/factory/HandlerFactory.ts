import { globSync } from 'glob';
import { Injectable, Provider } from '@nestjs/common';

@Injectable()
export class HandlerFactory {
    public static readonly handlers: Provider[] = [];

    public static readonly provider = {
        provide: 'handlerFactory',
        useFactory: async () => {
            HandlerFactory.loadHandlers();
            return HandlerFactory.handlers;
        },
    };

    private static async loadHandlers() {
        const handlerPaths: string[] = globSync('src/**/*.handler.ts');

        let handlerPath: string[];
        let fileName: string[];

        handlerPaths.map(async (path) => {
            handlerPath = path.split('\\');
            handlerPath.splice(0, 1, '../../..');

            fileName = handlerPath[handlerPath.length - 1].split('.');
            fileName.splice(-1, 1);

            handlerPath.splice(-1, 1, fileName.join('.'));

            let handler: Provider = await import(handlerPath.join('/'));

            this.handlers.push(Object.values(handler)[0]);
        });
    }
}
