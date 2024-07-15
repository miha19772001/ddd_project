import { globSync } from 'glob';
import { Injectable, Provider } from '@nestjs/common';

@Injectable()
export class CommandFactory {
    private static readonly commands: Provider[] = [];

    public static readonly provider = {
        provide: 'commandFactory',
        useFactory: async () => {
            CommandFactory.loadCommands();
            return CommandFactory.commands;
        },
    };

    private static async loadCommands() {
        const commandPaths: string[] = globSync('src/**/*.command.ts');

        let commandPath: string[];
        let fileName: string[];

        commandPaths.map(async (path) => {
            commandPath = path.split('\\');
            commandPath.splice(0, 1, '../../..');

            fileName = commandPath[commandPath.length - 1].split('.');
            fileName.splice(-1, 1);

            commandPath.splice(-1, 1, fileName.join('.'));

            let command: Provider = await import(commandPath.join('/'));

            this.commands.push(Object.values(command)[0]);
        });
    }
}
