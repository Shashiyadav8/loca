// server.js
const express = require('express');
const os = require('os');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Get your local IPv4 address
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const iface of Object.values(interfaces)) {
    for (const info of iface) {
      if (info.family === 'IPv4' && !info.internal) {
        return info.address;
      }
    }
  }
  return '127.0.0.1';
}

// Restrict access to only your frontend domain
app.use(cors({
  origin: ['https://frontend-5aqd.onrender.com'], // 🔐 Replace with your actual deployed site
  methods: ['GET']
}));

app.get('/api/ip', (req, res) => {
  const ip = getLocalIP();
  res.json({ ip });
});

app.listen(PORT, () => {
  console.log(`✅ Local IP Helper running at http://localhost:${PORT}/api/ip`);
});
