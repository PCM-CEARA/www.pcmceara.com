const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let vehicles = []; // Pode ser inicializado de uma forma persistente, se necessário.

io.on('connection', (socket) => {
    console.log('Novo cliente conectado');

    socket.on('updateVehicles', (newVehicles) => {
        vehicles = newVehicles; // Atualiza a lista de veículos
        socket.broadcast.emit('updateVehicles', vehicles); // Envia para todos os outros clientes
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
const express = require('express');
const app = express();

app.get('/stream', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    setInterval(() => {
        res.write(`data: ${new Date().toLocaleTimeString()}\n\n`);
    }, 1000);
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
