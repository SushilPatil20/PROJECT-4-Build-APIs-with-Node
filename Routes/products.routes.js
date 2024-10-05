
import { createProduct, getAllProducts } from "../Controller/books.controller.js"

export const productRoutes = (app) => {
    app.post("/api/product", createProduct)
    app.get("/api/products", getAllProducts)
}