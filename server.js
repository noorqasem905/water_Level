require('dotenv').config(); // 1. Load environment variables
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

// 2. Safely read keys from environment variables
const USERNAME = process.env.ADAFRUIT_IO_USERNAME || "nqasem";
const AIO_KEY = process.env.ADAFRUIT_IO_KEY;
const FEED_KEY = "distance";

app.get('/api/tank', async (req, res) => {
    try {
        if (!AIO_KEY) {
            return res.status(500).json({ error: "Missing Adafruit IO Key configuration on server." });
        }
        
        const url = `https://io.adafruit.com/api/v2/${USERNAME}/feeds/${FEED_KEY}/data/last`;
        const response = await axios.get(url, {
            headers: { "X-AIO-Key": AIO_KEY }
        });
        res.json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({ error: "فشل جلب البيانات" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running safely on port ${PORT}`));