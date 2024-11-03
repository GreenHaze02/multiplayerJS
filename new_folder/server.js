const http = require('http');
const localtunnel = require('localtunnel');
const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  res.end('Hello, World!\n');
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  
  localtunnel({ port: PORT }, (err, tunnel) => {
    if (err) {
      console.error('Error creating localtunnel:', err);
    } else {
      console.log(`Localtunnel URL: ${tunnel.url}`);

      // Close the tunnel when the server is stopped
      server.on('close', () => {
        tunnel.close();
      });
    }
  });
});
