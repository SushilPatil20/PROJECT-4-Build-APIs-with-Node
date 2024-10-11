import jwt from 'jsonwebtoken';

// ----------- Middleware to protect routes
export const authenticateToken = (req, res, next) => {
    // ----------- Get the token from the Authorization header -----------
    const token = req.header('Authorization')?.split(' ')[1]; // Bearer <token>
    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    // ----------- Verifing the token -----------
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded; // Add decoded token data (e.g., userId) to the request object
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

export default authenticateToken;