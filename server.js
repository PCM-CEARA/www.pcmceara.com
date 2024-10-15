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
