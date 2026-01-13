const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
// 0.0.0.0 ekleyerek dış dünyadan (mobil) erişimi açtık
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sunucu ${PORT} portunda ve ağ üzerinde çalışıyor...`);
});