import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  mongoose
    .connect(MONGODB_URI, options)
    .then((con) => console.log("Connected to MongoDB"));
}

export default dbConnect;
