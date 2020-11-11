import { IAddress } from 'app/shared/model/address.model';
import { IUser } from 'app/shared/model/user.model';
import { IQueue } from 'app/shared/model/queue.model';

export interface ICommerce {
  id?: number;
  identifier?: string;
  address?: IAddress;
  user?: IUser;
  commerce?: IQueue[];
}

export const defaultValue: Readonly<ICommerce> = {};
