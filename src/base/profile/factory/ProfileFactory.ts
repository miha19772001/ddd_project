import { Injectable, Type } from '@nestjs/common';

import { globSync } from 'glob';
import { ProfileBase } from '../ProfileBase';

export class ProfileFactory {
    private static readonly profiles: Type<any>[] = [];

    public static readonly initialize = {
        useFactory: async () => {
            ProfileFactory.loadProfiles();
            return ProfileFactory.profiles;
        },
    };

    private static async loadProfiles() {
        const porfilePaths: string[] = globSync('src/**/*.profile.ts');

        let porfilePath: string[];
        let fileName: string[];

        for (let i = 0; i < porfilePaths.length; i++) {
            const path = porfilePaths[i];

            porfilePath = path.split('\\');
            porfilePath.splice(0, 1, '../../..');

            fileName = porfilePath[porfilePath.length - 1].split('.');
            fileName.splice(-1, 1);

            porfilePath.splice(-1, 1, fileName.join('.'));

            const porfile: ProfileBase = await import(porfilePath.join('/'));

            const porfileConstructor = Object.values(porfile)[0];

            if (!porfileConstructor) continue;

            this.profiles.push(porfileConstructor);
        }
    }
}
