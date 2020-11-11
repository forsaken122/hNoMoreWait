import { IAddress } from 'app/shared/model/address.model';
import { IUser } from 'app/shared/model/user.model';
import { IQueue } from 'app/shared/model/queue.model';

export interface IPerson {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: IAddress;
  user?: IUser;
  person?: IQueue;
}

export const defaultValue: Readonly<IPerson> = {};
