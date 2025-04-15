import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the Visitor interface
export interface IVisitor extends Document {
  ip: string;
  company: string;
  city: string;
  country: string;
  pages: string[];
  lastVisited: Date;
  firstVisited: Date;
  visitCount: number;
  isp: string;
  region: string;
  timezone: string;
  userAgent?: string;
  referrer?: string;
}

// Define the visitor schema
const VisitorSchema = new Schema<IVisitor>({
  ip: { type: String, required: true, index: true },
  company: { type: String, default: 'Unknown' },
  city: { type: String, default: 'Unknown' },
  country: { type: String, default: 'Unknown' },
  pages: { type: [String], default: [] },
  lastVisited: { type: Date, default: Date.now },
  firstVisited: { type: Date, default: Date.now },
  visitCount: { type: Number, default: 1 },
  isp: { type: String, default: 'Unknown' },
  region: { type: String, default: 'Unknown' },
  timezone: { type: String, default: 'Unknown' },
  userAgent: { type: String },
  referrer: { type: String },
});

// Create and export the model
// Use mongoose.models to prevent "OverwriteModelError" during hot reloading
export const Visitor: Model<IVisitor> = 
  mongoose.models.Visitor || mongoose.model<IVisitor>('Visitor', VisitorSchema);

export default Visitor; 