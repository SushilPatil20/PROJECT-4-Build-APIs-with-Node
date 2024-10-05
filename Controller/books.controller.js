import Product
    from "../Model/products.model.js";

/**
 * 
 * @param {}
 * @returns void 
 */
export const createProduct = async (req, res) => {
    const { name, price, description, stockQuantity } = req.body
    const newProduct = new Product({
        name: name,
        price: price,
        description: description,
        stockQuantity: stockQuantity
    })
    const storedProduct = await newProduct.save();
    if (!storedProduct)
        return res.status(400).json({ message: "Somthing went wrong. while creating a new product." })

    res.status(201).json({ message: "New Products is created", product: storedProduct })
}

export const getAllProducts = async (req, res) => {
    const products = await Product.find()
    res.status(200).json({ products: products })
}



