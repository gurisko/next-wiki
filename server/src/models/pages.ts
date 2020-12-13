import mongoose from 'mongoose';
import { generateMarkdown } from '../lib/generateMarkdown';

import { generateSlug } from '../lib/generateSlug';

const PageSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  rawContent: {
    type: String,
    required: true,
  },
  markdownContent: {
    type: String,
    required: true,
  },
  ipAddress: {
    type: String,
  },
}, {
  timestamps: true,
});

export interface PageDocument extends mongoose.Document {
  path: string;
  title: string;
  rawContent: string;
  markdownContent: string;
  ipAddress?: string;
  createdAt: string;
  updatedAt: string;
}

PageSchema.pre<PageDocument>('validate', function(next) {
  this.path = generateSlug(this.title);
  this.rawContent = generateMarkdown(this.markdownContent);
  next();
});

export const Page = mongoose.model<PageDocument>('Page', PageSchema);
