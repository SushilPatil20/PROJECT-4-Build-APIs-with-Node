import mongoose from "mongoose";
const cartSchema = mongoose.Schema({
})
const Cart = mongoose.model("cart", cartSchema)
export default Cart;