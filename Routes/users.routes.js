import { loginUser, registerUser } from "../Controller/users.controller.js";

export const userRoutes = (app) => {
    app.post("/register", registerUser);
    app.post("/login", loginUser)
}

export default userRoutes