export interface IAddress {
  id?: number;
  address?: string;
  addressLine2?: string;
  postalCode?: string;
  city?: string;
  stateProvince?: string;
}

export const defaultValue: Readonly<IAddress> = {};
