const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: "Yetkisiz erişim" });

    try {
        const decoded = jwt.verify(token.split(" ")[1], 'gizli_anahtar');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: "Geçersiz token" });
    }
};