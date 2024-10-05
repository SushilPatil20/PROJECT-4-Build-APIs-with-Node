import mongoose from "mongoose";
const productsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    stockQuantity: {
        type: Number
    }
}, { timestamps: true })
const Product = mongoose.model("product", productsSchema)
export default Product;