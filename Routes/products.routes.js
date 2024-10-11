import { createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from
    "../Controller/products.controller.js"
import upload from "../middlewares/uploadImage.js"
import { validate } from "../middlewares/validate.js"
import { productValidationRules } from "../validators/productValidator.js"


export const productRoutes = (app) => {
    app.get("/api/products", getAllProducts)
    app.get("/api/products/:id", getSingleProduct)
    app.post("/api/product", upload.single('image'), productValidationRules, validate, createProduct)
    app.delete("/api/product/:id", deleteProduct)
    app.put("/api/product/:id", upload.single('image'), productValidationRules, validate, updateProduct)
}