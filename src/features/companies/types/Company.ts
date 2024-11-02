import { Address } from 'src/common/types/Address';

export type Company = {
  _id: string;
  name: string;
  email: string;
  address: Address;
  tinNumber: string;
  contacts: CompanyContact[];
  createdAt: Date;
  updatedAt: Date;
};

export type CompanyContact = {
  name: string;
  email: string;
  phone: string;
  position: string;
};
