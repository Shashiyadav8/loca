const express = require('express');
const cors = require('cors');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ Strict CORS: Allow only your deployed frontend
app.use(cors({
  origin: 'https://frontend-5aqd.onrender.com',  // 🔒 Your frontend domain here
  methods: ['GET'],
}));

// ✅ API route to get local device IP
app.get('/api/ip', (req, res) => {
  const interfaces = os.networkInterfaces();
  let ip = '127.0.0.1'; // fallback

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

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`✅ Local IP Helper running at http://localhost:${PORT}/api/ip`);
});
