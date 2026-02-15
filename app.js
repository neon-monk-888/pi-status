const express = require('express');
const si = require('systeminformation');

const app = express();
const PORT = 3000;

app.get('/', async (req, res) => {
  try {
    const [cpu, mem, disk, info] = await Promise.all([
      si.cpu(),
      si.mem(),
      si.fsSize(),
      si.osInfo()
    ]);

    const stats = `<!DOCTYPE html>
<html>
<head>
  <title>Pi Status</title>
  <style>
    body { font-family: 'Segoe UI', sans-serif; padding: 2em; background: #f0f0f0; }
    h1 { color: #333; }
    pre { background: #fff; padding: 1em; border-radius: 8px; overflow-x: auto; width: 80vw; }
  </style>
</head>
<body>
  <h1>📱 Pi System Status</h1>
  <pre>Hostname: ${info.hostname}
OS: ${info.distro} ${info.release}
Uptime: ${Math.floor(si.time().current - info.bootTime)}s

CPU: ${cpu.manufacturer} ${cpu.brand}
Usage: ${await si.currentLoad()}%

Memory:
  Total: ${(mem.total / 1e9).toFixed(1)}GB
  Free: ${(mem.free / 1e9).toFixed(1)}GB

Disk ${disk[0].fs} (${disk[0].type}): ${disk[0].use}% used
  Size: ${(disk[0].size / 1e9).toFixed(0)}GB
  Free: ${(disk[0].available / 1e9).toFixed(0)}GB</pre>
</body>
</html>`;

    res.send(stats);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching system stats');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});