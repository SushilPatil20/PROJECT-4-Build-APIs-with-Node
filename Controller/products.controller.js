import Product
    from "../Model/product.model.js";
import { uploadImageToFirebase, deleteImageFromFirebase } from "../utils/firebaseUtils.js";
import { notFound } from "../utils/helpers.js";

// ------------------- Get Products  -------------------

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        return res.status(200).json({ products: products })
    }
    catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message })
    }
}


// ------------------- Get Product  -------------------

export const getSingleProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const product = await Product.findById(productId)
        if (!product) {
            return notFound(res)
        }
        return res.status(200).json(product)
    }
    catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message })
    }
}


// ------------------- Create new Product  -------------------

export const createProduct = async (req, res) => {
    const { name, price, description, stockQuantity } = req.body
    try {
        if (!req.file) return res.json({ error: "file is required." });

        // Upload the image to Firebase and get the download URL
        const image = await uploadImageToFirebase(req.file)
        const newProduct = new Product({
            name,
            price,
            description,
            stockQuantity,
            image // Storing Firebase URL in the database
        })

        const storedProduct = await newProduct.save();
        return res.status(201).json({ message: "New Products is created", product: storedProduct })
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            const errorMessages = {};

            // ------------------- Looping through each error and getting the message
            Object.keys(error.errors).forEach((key) => {
                errorMessages[key] = error.errors[key].message;
            })
            return res.status(400).json({ errors: errorMessages })
        }
        return res.status(400).json({ message: "Internal Server Error" })
    }
}


// ------------------- Delete a Product  -------------------
export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const product = await Product.findById(productId);
        if (!product) return notFound(res)
        // ------------ Delete productImage fromFireBase ------------
        await deleteImageFromFirebase(product.image);
        // ------------ Deleting product from DB ------------
        await Product.findByIdAndDelete(productId)
        return res.status(204).send() // No body is sent with 204 status
    }
    catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message })
    }
}


// ------------------- Update a Product  -------------------

export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const { name, price, description, stockQuantity } = req.body

        const newImage = req.file // Get the uploaded image file

        const existingProduct = await Product.findById(productId);
        if (!existingProduct) return notFound(res)

        // -------- Handle image update --------
        let image = existingProduct.image // ------------ preserve existing image
        if (newImage) {
            // Uploading new image and getting new Url to store in DB
            const newImageUrl = await uploadImageToFirebase(newImage)
            image = newImageUrl;  // ------------ replacing existing imahe

            // -------- Cleaning up the old image from firebase --------
            await deleteImageFromFirebase(existingProduct.image)
        }

        const updatedProduct = await Product.findByIdAndUpdate(productId, {
            name, price, description, stockQuantity, image
        }, { new: true }) // -------- Return the updated product --------

        return res.status(200).json({ message: "Product updated..", product: updatedProduct });
    }
    catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}