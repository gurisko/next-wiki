import mongoose from 'mongoose';

export async function connect(): Promise<void> {
  const {MONGODB_URI} = process.env;
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined');
  }
  mongoose.set('useCreateIndex', true);
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useFindAndModify', false);
  mongoose.set('useUnifiedTopology', true);
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');
}
