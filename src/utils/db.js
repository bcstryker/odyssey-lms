import mongoose from "mongoose";

let isConnected = false; // Track the connection status

export const connectDB = async () => {
  if (isConnected) {
    console.log("Already connected to the database.");
    return;
  }

  if (mongoose.connections.length > 0) {
    isConnected = mongoose.connections[0].readyState === 1;
    if (isConnected) {
      console.log("Using existing database connection.");
      return;
    }
    await mongoose.disconnect();
  }

  const dbURI = process.env.MONGODB_URI;
  await mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  isConnected = true;
  console.log("New database connection established.");
};