import { Document, Schema } from 'mongoose';
import { Company } from '../types/Company';

export const CompanySchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, required: true, auto: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      number: { type: String, required: true },
      neighborhood: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, required: true },
      country: { type: String, required: true },
    },
    tinNumber: { type: String, required: true },
    contacts: [
      {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        position: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export interface ICompanyEntity extends Omit<Company, '_id'>, Document {}
