// server.js
const express = require('express');
const cors = require('cors');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ Allow only your deployed React frontend to access
const allowedOrigins = ['https://frontend-5aqd.onrender.com']; // 🔁 Change to your actual frontend domain

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('❌ CORS: Not allowed'));
      }
    },
    methods: ['GET'],
  })
);

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

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Local IP Helper running at http://localhost:${PORT}/api/ip`);
});
