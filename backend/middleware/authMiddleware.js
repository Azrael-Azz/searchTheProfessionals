import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    //split converts the token into array and [1] defines the second index of the token
    if (!token) return res.status(403).send('Token not found');

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data;
        next();
    } catch (e) {
        res.status(401).json(e);
    }
}