import Cart from "../Model/cart.model.js"
import Product from "../Model/product.model.js"
import { notFound } from "../utils/helpers.js"



// {
//     "email":"patildipaleeoo47@gmail.com",
//     "password":"dipaleePatil12345"
//   }



export const cartItems = async (req, res) => {
    const userId = req.user.userId
    try {
        const cart = await Cart.findOne({ userId })

        return res.status(200).json({ cart: cart })
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
// Add a product to the cart
export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body
    const userId = req.user.userId
    try {
        const product = await Product.findById(productId)
        if (!product) return notFound(req);

        // Get cart of the user by id
        let cart = await Cart.findOne({ userId })
        if (!cart) {
            cart = new Cart({ userId, items: [] })
        }
        // Check if item already exits in his cart
        const isItemExist = cart.items.find((item) => item.productId.toString() === productId)

        if (isItemExist) {
            return res.status(400).json({ message: "Item already exist in a cart" })
        }
        // Add new product to the cart
        cart.items.push({ productId, quantity, price: product.price })



        // Recalculate total price
        cart.totalPrice = cart.items.reduce((acc, item) => acc + item.quantity * item.price, 0)
        await cart.save();
        return res.status(200).json(cart)
    }
    catch (error) {
        return res.status(500).json({ message: "Server error :", error: error.message });
    }
}


export const deleteItem = async (req, res) => {
    const itemId = req.params.itemId;
    const userId = req.user.userId
    try {
        const cart = await Cart.findOne({ userId })

        if (!cart) {
            return res.status(404).json({ message: "Cart Not found.." });
        }

        const filteredCart = cart.items.filter((item) => item._id.toString() !== itemId)
        cart.items = filteredCart
        await cart.save();
        return res.status(200).json({ message: 'Item deleted from cart', cart: cart.items });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}



