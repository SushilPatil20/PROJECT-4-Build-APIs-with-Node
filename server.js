import express from "express";
import connectionToDB from "./config/db.js";
import { config as configDotenv } from "dotenv";
import { productRoutes } from "./Routes/products.routes.js";
import { userRoutes } from "./Routes/users.routes.js";
import { cartRoutes } from "./Routes/carts.routes.js";
configDotenv();
const app = express();
const PORT = process.env.PORT || 7000
app.use(express.json())

// --------- Connecting to the database ---------
connectionToDB(process.env.DB_URI);

userRoutes(app)
cartRoutes(app)
productRoutes(app)



app.listen(PORT, () => {
    console.log("Server is running...")
})