import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import mongoConnect from "./config/db.js";
import { errorResponserHandler } from "./middleware/errorHandler.js";
import { invalidPathHandler } from "./middleware/errorHandler.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const __dirname = path.resolve();

import cors from "cors";

//routes

import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();
mongoConnect();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

//static assets
console.log(__dirname);
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(invalidPathHandler);
app.use(errorResponserHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
