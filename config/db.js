import mongoose from "mongoose"

/**
 * 
 * @param {String} URI 
 * @returns void
 */
const connectionToDB = (URI) => {
    mongoose.connect(URI)
    const db = mongoose.connection
    db.on("open", () => {
        console.log("DB Connected..")
    })

    db.on("error", () => {
        console.log("Connection failed.")
    })
}
export default connectionToDB;