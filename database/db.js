import mongoose from 'mongoose';

export const dbConnect=()=>mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    () => {
      console.log('Connected to MongoDB');
    }
  );

