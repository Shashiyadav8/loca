const express = require('express');
const cors = require('cors');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ Only allow your frontend
app.use(cors({
  origin: ['https://frontend-5aqd.onrender.com'], // ⬅️ your deployed React app
  methods: ['GET'],
}));

// ✅ Route to get local IP
app.get('/api/ip', (req, res) => {
  const interfaces = os.networkInterfaces();
  let ip = '127.0.0.1';

  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        ip = net.address;
        break;
      }
    }
  }

  res.json({ ip });
});

app.listen(PORT, () => {
  console.log(`✅ Local IP Helper running at http://localhost:${PORT}/api/ip`);
});
