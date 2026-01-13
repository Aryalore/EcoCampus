const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create(username, email, hashedPassword);
        res.status(201).json({ message: "Kullanıcı oluşturuldu", user: { id: newUser.id, username: newUser.username } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByEmail(email);
        if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Hatalı şifre" });

        const token = jwt.sign({ id: user.id }, 'gizli_anahtar', { expiresIn: '1h' });
        res.json({ token, user: { id: user.id, username: user.username } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};