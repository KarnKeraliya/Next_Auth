import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!)
    const connection = mongoose.connection

    connection.on("connected",() => {
      console.log("MongoDB connected");
    })

    connection.on("error", (err) => {
      console.log("error in connection make sure not down database: ", err);
      process.exit();
    })
  } catch (error) {
    console.log("Something went wrong while connecting to database: ", error);
  }
}