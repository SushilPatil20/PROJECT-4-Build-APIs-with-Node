export const notFound = (res, name = "Product") => {
    return res.status(404).json({ message: `${name} not found..!!` })
}

export const calculateTotalPriceOfCartItem = (array) => {
    const totalPrice = array.reduce((acc, item) => acc + item.quantity * item.price, 0)
    return totalPrice || 0;
}