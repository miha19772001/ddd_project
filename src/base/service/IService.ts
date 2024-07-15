import { EntityBase } from '../entity/EntityBase';

export interface IService<TEntity extends EntityBase> {
    add(entity: TEntity): Promise<TEntity>;
    getAll(): Promise<TEntity[]>;
    getById(id: number): Promise<TEntity>;
    remove(entity: TEntity): Promise<TEntity>;
}
