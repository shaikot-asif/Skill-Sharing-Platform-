import mongoose from "mongoose";

const mongoConnect = async () => {
  const MONGODBURI = process.env.MONGODBURI;

  try {
    await mongoose.connect(MONGODBURI);
    console.log("Database is connected...");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};
export default mongoConnect;
