import { Local } from '../types/Local';
import { Document, Schema } from 'mongoose';

export const LocalSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, required: true, auto: true },
    geolocation: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    name: { type: String, required: true },
    description: { type: String, required: false },
    itinerary: {
      type: Schema.Types.ObjectId,
      ref: 'Itinerary',
      required: true,
    },
    histories: [
      {
        language: { type: String, required: true },
        text: { type: String, required: true },
        images: [{ type: String, required: false }],
        audio: { type: String, required: false },
        video: { type: String, required: false },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export interface ILocalEntity extends Omit<Local, '_id'>, Document {}
