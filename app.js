const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Quando um cliente se conecta
io.on('connection', (socket) => {
    console.log('Um usuário conectado');

    // Escutar eventos do cliente
    socket.on('disconnect', () => {
        console.log('Um usuário desconectou');
    });
});

server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
