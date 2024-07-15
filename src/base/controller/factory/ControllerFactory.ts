import { Type } from '@nestjs/common';
import { ControllerBase } from '../ControllerBase';
import { globSync } from 'glob';

export class ControllerFactory {
    private static readonly controllers: Type<any>[] = [];

    public static readonly initialize = {
        useFactory: async () => {
            ControllerFactory.loadControllers();
            return ControllerFactory.controllers;
        },
    };

    private static async loadControllers() {
        const controllerPaths: string[] = globSync('src/**/*.controller.ts');

        let controllerPath: string[];
        let fileName: string[];

        for (let i = 0; i < controllerPaths.length; i++) {
            const path = controllerPaths[i];

            controllerPath = path.split('\\');
            controllerPath.splice(0, 1, '../../..');

            fileName = controllerPath[controllerPath.length - 1].split('.');
            fileName.splice(-1, 1);

            controllerPath.splice(-1, 1, fileName.join('.'));

            const controller: ControllerBase = await import(
                controllerPath.join('/')
            );

            const controllerConstructor = Object.values(controller)[0];

            if (!controllerConstructor) continue;

            this.controllers.push(controllerConstructor);
        }
    }
}
