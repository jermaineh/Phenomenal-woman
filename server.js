const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Get the requested URL (e.g., /about)
    let url = req.url;

    // Serve static files like CSS and images
    if (url.startsWith('/static') || url.startsWith('/img')) {
        // Map the static files request to the correct file in the 'static' or 'img' folder
        const filePath = path.join(__dirname, url); // Serve from the correct folder
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain');
                res.end('404 File Not Found');
            } else {
                // Set appropriate Content-Type for static files
                if (url.endsWith('.css')) {
                    res.setHeader('Content-Type', 'text/css');
                } else if (url.endsWith('.jpg') || url.endsWith('.jpeg')) {
                    res.setHeader('Content-Type', 'image/jpeg');
                } else if (url.endsWith('.png')) {
                    res.setHeader('Content-Type', 'image/png');
                } else if (url.endsWith('.gif')) {
                    res.setHeader('Content-Type', 'image/gif');
                }
                res.statusCode = 200;
                res.end(data);
            }
        });
    } else {
        // If it's not a static file, assume it's an HTML file and serve it
        if (!url.includes('.')) {
            url += '.html';  // If URL doesn't have an extension, add .html
        }
        const filePath = path.join(__dirname, url); // Serve from root directory

        // Read and serve the HTML file
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
    }
});

// Listen on all network interfaces (0.0.0.0) and port 3000
server.listen(3000, '0.0.0.0', () => {
    console.log('Server running on http://0.0.0.0:3000');
});

