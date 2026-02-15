# Pi Status Monitor

A simple Node.js Express application that displays live system statistics for a Raspberry Pi.

## Features
- 📱 Hostname and OS information
- ⏱️ Uptime tracking
- 📈 CPU usage monitoring
- 💾 Memory usage visualization
- 💽 Disk space reporting

## Installation & Usage

### Local Setup
```bash
# Clone the repository
git clone https://github.com/neon-monk-888/pi-status.git
cd pi-status

# Install dependencies
npm install

# Start the server
npm start
```

### Docker Setup
```bash
# Build the Docker image
docker build -t pi-status .

# Run the container
docker run -d -p 3000:3000 pi-status
```

Visit http://localhost:3000 in your browser to view the system stats.

## API Endpoints
- `GET /` - Main page with HTML-formatted system stats

## Dependencies
- [express](https://expressjs.com/) - Web framework
- [systeminformation](https://www.npmjs.com/package/systeminformation) - Hardware stats library

## License
MIT License - see LICENSE file

## Contributing
Pull requests are welcome! Please ensure tests pass and follow the style guide.