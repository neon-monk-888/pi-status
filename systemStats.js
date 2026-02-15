const process = require('process');

async function getSystemStats() {
  const si = require('systeminformation');
  
  try {
    const [cpu, mem, disk, info] = await Promise.all([
      si.cpu(),
      si.mem(),
      si.fsSize(),
      si.osInfo()
    ]);

    return {
      hostname: info.hostname,
      os: `${info.distro} ${info.release}`,
      uptime: Math.floor(si.time().current - info.bootTime),
      cpu: {
        manufacturer: cpu.manufacturer,
        brand: cpu.brand,
        load: await si.currentLoad()
      },
      memory: {
        total: mem.total,
        free: mem.free
      },
      disk: {
        fs: disk[0].fs,
        type: disk[0].type,
        used: disk[0].used,
        total: disk[0].size
      }
    };
  } catch (err) {
    console.error('Error fetching system stats:', err);
    process.exit(1);
  }
}

// For direct testing
if (require.main === module) {
  getSystemStats().then(console.log);
}

module.exports = getSystemStats;