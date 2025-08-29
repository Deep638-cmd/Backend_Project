import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();

export const verify = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: "header is not found" });
    }

    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "token is invalid" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT);
        console.log("Decoded token:", decoded);

        // If you wrapped the id in { id: ... }, extract it here
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(500).json({ error: "Invalid token", details: err });
    }
}

export const generate = (id) => {
    // wrap id inside an object
    return jwt.sign({ id }, process.env.JWT, { expiresIn: "1h" });
}
