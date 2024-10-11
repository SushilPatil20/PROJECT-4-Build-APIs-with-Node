export const notFound = (res, name = "Product") => {
    return res.status(404).json({ message: `${name} not found..!!` })
}

