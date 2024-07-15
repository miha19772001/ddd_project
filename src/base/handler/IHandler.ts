import { Type } from '@nestjs/common';

export interface IHandler<TForm> {
    execute(form: TForm): Promise<any>;
}
