import express from "express";
import connectionToDB from "./config/db.js";
import { config as configDotenv } from "dotenv";
import { productRoutes } from "./Routes/products.routes.js";
configDotenv();
const app = express();
const PORT = process.env.PORT || 7000
app.use(express.json())
// Connecting to the database
connectionToDB(process.env.DB_URI);






productRoutes(app)





app.get("/get", (req, res) => {
    return res.json({ message: "Radhe Krishna" });
})




app.listen(PORT, () => {
    console.log("Server is running...")
})