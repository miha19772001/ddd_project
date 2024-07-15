import { globSync } from 'glob';
import { Injectable, Provider } from '@nestjs/common';

@Injectable()
export class QueryFactory {
    private static readonly queries: Provider[] = [];

    public static readonly provider = {
        provide: 'queryFactory',
        useFactory: async () => {
            QueryFactory.loadQueries();
            return QueryFactory.queries;
        },
    };

    private static async loadQueries() {
        const queryPaths: string[] = globSync('src/**/*.query.ts');

        let queryPath: string[];
        let fileName: string[];

        queryPaths.map(async (path) => {
            queryPath = path.split('\\');
            queryPath.splice(0, 1, '../../..');

            fileName = queryPath[queryPath.length - 1].split('.');
            fileName.splice(-1, 1);

            queryPath.splice(-1, 1, fileName.join('.'));

            let query: Provider = await import(queryPath.join('/'));

            this.queries.push(Object.values(query)[0]);
        });
    }
}
