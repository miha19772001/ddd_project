export interface ICommand<TContext> {
    execute(commandContext: TContext): Promise<any>;
}
