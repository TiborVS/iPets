const jwt = require('jsonwebtoken');

async function authenticateToken(req, res, next) {
    const authHeader = req.header('authorization');
    if (!authHeader) return res.status(401).json({error: "Authorization header must be provided"});
    const token = authHeader.split(' ')[1];
    console.log('extracted token: ' + token);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.type !== "access") return res.status(401).json({error: "Invalid token type"});
        req.user = { id: decoded.id, email: decoded.email };
        return next();
    }
    catch (err) {
        console.error(err);
        return res.status(401).json({error: "Invalid access token"});
    }
}

module.exports = authenticateToken;
