import mongoose from 'mongoose';

export const dbConnect = () => {
  mongoose.connect(process.env.MONGO_URI, {
    dbName: "Todo",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000 // 10 seconds
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((e) => {
    console.error("Connection error:", e.message);
    process.exit(1); // Exit the process if the connection fails
  });

  // Optionally, listen for successful connection
  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected successfully');
  });

  // Optionally, handle disconnection events
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
  });
};
