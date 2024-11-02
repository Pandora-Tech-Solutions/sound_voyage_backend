import { Schema } from 'mongoose';
import { Traveler } from '../types/Traveler';

export const TravelerSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, required: true, auto: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: false },
    birthdate: { type: Date, required: false },
    itineraries: [{ type: String, ref: 'Itinerary', required: false }],
  },
  {
    timestamps: true,
  },
);

export interface ITravelerEntity extends Omit<Traveler, '_id'>, Document {}
