/**
 * Simple HTTP server for Pop Song Summer
 * 
 * This script provides a simple HTTP server to serve the Pop Song Summer
 * project files, avoiding CORS issues with ES modules.
 * 
 * Usage:
 * 1. Make sure Node.js is installed
 * 2. Run: node server.js
 * 3. Open: http://localhost:3000 in your browser (or alternative port if 3000 is busy)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// Default port to use (will try alternatives if busy)
const DEFAULT_PORT = 3000;
// Alternative ports to try if the default is in use
const ALTERNATIVE_PORTS = [3001, 3002, 3003, 8080, 8081, 8082];

// MIME types for different file extensions
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.eot': 'application/vnd.ms-fontobject'
};

// Create the server
const server = http.createServer((req, res) => {
  console.log(`Request: ${req.method} ${req.url}`);
  
  // Handle the root URL
  let filePath;
  
  if (req.url === '/') {
    // Serve index.html for root URL
    filePath = path.join(__dirname, 'index.html');
  } else if (req.url.startsWith('/assets/') || req.url.startsWith('/music/')) {
    // For assets and music, look in the parent directory (devco)
    filePath = path.join(__dirname, '..', req.url);
  } else {
    // For everything else, look in the current directory
    filePath = path.join(__dirname, req.url);
  }
  
  // Get the file extension
  const extname = path.extname(filePath);
  
  // Set the content type based on the file extension
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';
  
  // Read the file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File not found
        console.log(`File not found: ${filePath}`);
        res.writeHead(404);
        res.end('404 - File Not Found');
      } else {
        // Server error
        console.error(`Server error: ${err.code}`);
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success - send the file
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Function to start the server on a specific port
function startServer(port) {
  server.listen(port)
    .on('listening', () => {
      console.log(`
========================================================
  Pop Song Summer server running at http://localhost:${port}
  
  Open your browser and navigate to:
  http://localhost:${port}
  
  Press Ctrl+C to stop the server
========================================================
`);
    })
    .on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} is already in use, trying another port...`);
        tryNextPort();
      } else {
        console.error('Server error:', err);
      }
    });
}

// Try ports in sequence
let currentPortIndex = -1;

function tryNextPort() {
  currentPortIndex++;
  
  // Try the default port first
  if (currentPortIndex === 0) {
    startServer(DEFAULT_PORT);
    return;
  }
  
  // Then try alternative ports
  const alternativeIndex = currentPortIndex - 1;
  if (alternativeIndex < ALTERNATIVE_PORTS.length) {
    startServer(ALTERNATIVE_PORTS[alternativeIndex]);
    return;
  }
  
  // If all ports are busy, give up
  console.error('All ports are busy. Please close some applications and try again.');
  process.exit(1);
}

// Start trying ports
tryNextPort();