import { Schema } from 'mongoose';
import { Itinerary } from '../types/Itinerary';

export const ItinerarySchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, required: true, auto: true },
    name: { type: String, required: true },
    description: { type: String },
    company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    price: { type: Number, required: true },
    durationInMinutes: { type: Number, required: true },
    image: { type: String },
  },
  {
    timestamps: true,
  },
);

export interface IItineraryEntity extends Omit<Itinerary, '_id'>, Document {}
