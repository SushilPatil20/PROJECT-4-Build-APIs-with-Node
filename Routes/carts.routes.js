import { cart, addToCart, deleteItem, updateQuantity } from "../Controller/carts.controller.js"
import authenticateToken from "../middlewares/auth.js"

export const cartRoutes = (app) => {
    app.get("/cart", authenticateToken, cart)
    app.post("/cart/add-item/", authenticateToken, addToCart)
    app.delete("/cart/delete-item/", authenticateToken, deleteItem)
    app.patch("/cart/update-item/", authenticateToken, updateQuantity)
}

