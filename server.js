const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Get the requested URL (e.g., /about)
    let url = req.url;

    // If the URL doesn't have an extension, add ".html" (e.g., /about -> /about.html)
    if (!url.includes('.')) {
        url += '.html';
    }

    // Define the file path to serve (files are in the root directory)
    const filePath = path.join(__dirname, url); // Remove 'public' and directly reference root

    // Read and serve the file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('404 Page Not Found');
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        }
    });
});

// Listen on all network interfaces (0.0.0.0) and port 3000
server.listen(3000, '0.0.0.0', () => {
    console.log('Server running on http://0.0.0.0:3000');
});
