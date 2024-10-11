import { cartItems, addToCart, deleteItem } from "../Controller/carts.controller.js"
import authenticateToken from "../middlewares/auth.js"

export const cartRoutes = (app) => {
    app.get("/cart", authenticateToken, cartItems)
    app.post("/cart/add-item/", authenticateToken, addToCart)
    app.delete("/cart/delete-item/:itemId", authenticateToken, deleteItem)
}

