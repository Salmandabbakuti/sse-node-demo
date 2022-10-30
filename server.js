const http = require('http');

const requestListener = (req, res) => {
  if (req.url === '/sse') {
    res.statusCode = 200;
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });
    setInterval(() => {
      const timestamp = new Date().toLocaleTimeString();
      const ticker = Math.random();
      console.log('ticking..');
      res.write(`data: ${timestamp}: ${ticker}\n\n`);
      console.log(`${timestamp}: ${ticker}`);
    }, 1000);
  } else {
    res.writeHead(200);
    res.end('Hello. This is an SSE server. Please go to /sse');
  }
};

const server = http.createServer(requestListener);

server.listen(4000, () => {
  console.log("server running at http://localhost:4000");
});
