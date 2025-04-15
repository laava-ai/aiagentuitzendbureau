import mongoose from 'mongoose';

// Configure mongoose to not use strict query
mongoose.set('strictQuery', false);

// Connection URL from environment variables
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/visitor-tracking';

// Define the cached connection interface
interface CachedConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Initialize the cached connection
let cached: CachedConnection = (global as any).mongoose || { conn: null, promise: null };

if (!(global as any).mongoose) {
  (global as any).mongoose = cached;
}

/**
 * Connect to MongoDB database
 * @returns Mongoose connection instance
 */
export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      // Use direct connection to the MongoDB server
      directConnection: true,
      // No srv option for standard MongoDB URIs
    };

    // Log the connection attempt (without exposing the full URI with credentials)
    const sanitizedUri = MONGODB_URI.replace(
      /mongodb(\+srv)?:\/\/[^@]+@/,
      'mongodb$1://****:****@'
    );
    console.log(`Connecting to MongoDB: ${sanitizedUri}`);

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('MongoDB connected successfully');
        return mongoose;
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error);
        // Clear the cached promise so we can retry on next request
        cached.promise = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    // If connection fails, nullify the promise so it can be retried
    cached.promise = null;
    throw error;
  }
}

// Add global mongoose for TypeScript
declare global {
  var mongoose: CachedConnection | undefined;
} 