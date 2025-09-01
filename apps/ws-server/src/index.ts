import ws from 'ws';

const wss = new ws.Server({ port: 3001 });
wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        // Echo the message back to the client
        ws.send(`Server received: ${message}`);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
}
);

console.log('WebSocket server is running on ws://localhost:3001');