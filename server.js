import express from "express";
import dotenv from "dotenv";
import mongoConnect from "./config/db.js";
import { errorResponserHandler } from "./middleware/errorHandler.js";
import { invalidPathHandler } from "./middleware/errorHandler.js";

//routes

import userRoutes from "./routes/userRoutes.js";

dotenv.config();
mongoConnect();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use("/api/users", userRoutes);

app.use(invalidPathHandler);
app.use(errorResponserHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
