import { Moment } from 'moment';
import { IPerson } from 'app/shared/model/person.model';
import { ICommerce } from 'app/shared/model/commerce.model';

export interface IQueue {
  id?: number;
  actCount?: number;
  maxCount?: number;
  creationDate?: string;
  closeDate?: string;
  skipTurn?: boolean;
  queues?: IPerson[];
  commerce?: ICommerce;
}

export const defaultValue: Readonly<IQueue> = {
  skipTurn: false,
};
