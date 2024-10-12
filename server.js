import express from "express";
import connectionToDB from "./config/db.js";
import { config as configDotenv } from "dotenv";
import { productRoutes } from "./Routes/products.routes.js";
import { userRoutes } from "./Routes/users.routes.js";
import { cartRoutes } from "./Routes/carts.routes.js";

configDotenv();  // --------- Getting access to the environment variables

const app = express();
const PORT = process.env.PORT || 7000

app.use(express.json())  // --------- Middleware to parse the JSON data.

connectionToDB(process.env.DB_URI); // ---------- Connecting to the database

userRoutes(app) // --------------------- Calling user routes 
cartRoutes(app) // --------------------- Calling cart routes
productRoutes(app) // ------------------ Callinf Product routes

app.listen(PORT, () => console.log("Server is running..."))