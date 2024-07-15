export interface IQuery<TCriteria> {
    execute(queryCriteria: TCriteria): Promise<any>;
}
