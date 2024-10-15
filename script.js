let loggedInUser = null;
let vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];

// Função de login
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    // Verifica se as credenciais são válidas (simples, sem backend real)
    if (username && password) {
        loggedInUser = username;
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        displayVehicles();
    } else {
        alert('Usuário ou senha inválidos!');
    }
}

// Função de logout
function logout() {
    loggedInUser = null;
    document.getElementById('auth-section').style.display = 'block';
    document.getElementById('main-content').style.display = 'none';
}

// Exibir formulário de registro
function showRegisterForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
}

// Exibir formulário de login
function showLoginForm() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
}

// Função de registro
function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    // Registro básico sem backend (apenas para exibição)
    if (username && password) {
        alert('Usuário registrado com sucesso!');
        showLoginForm();
    } else {
        alert('Preencha todos os campos!');
    }
}

// Função para adicionar veículo
function addVehicle() {
    const vehicleName = document.getElementById('vehicle-name').value;
    const vehiclePhoto = document.getElementById('vehicle-photo').files[0];
    const piecesBlue = document.getElementById('pieces-blue').value;
    const piecesGreen = document.getElementById('pieces-green').value;
    const vehiclePrice = document.getElementById('vehicle-price').value;

    if (vehiclePhoto) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const newVehicle = {
                name: vehicleName,
                photo: e.target.result,
                piecesBlue: piecesBlue,
                piecesGreen: piecesGreen,
                price: vehiclePrice,
                addedBy: loggedInUser
            };

            vehicles.push(newVehicle);
            localStorage.setItem('vehicles', JSON.stringify(vehicles));
            displayVehicles();
            clearAddVehicleForm();
        };
        reader.readAsDataURL(vehiclePhoto);
    } else {
        alert('Selecione uma foto para o veículo.');
    }
}

// Função para exibir veículos
function displayVehicles() {
    const vehicleList = document.getElementById('vehicle-list');
    vehicleList.innerHTML = '';

    vehicles.forEach((vehicle, index) => {
        const vehicleItem = document.createElement('div');
        vehicleItem.classList.add('vehicle-item');
        vehicleItem.innerHTML = `
            <img src="${vehicle.photo}" alt="${vehicle.name}">
            <div class="details">
                <h3>${vehicle.name}</h3>
                <p><strong>Peças Azuis:</strong> ${vehicle.piecesBlue}</p>
                <p><strong>Peças Verdes:</strong> ${vehicle.piecesGreen}</p>
                <p><strong>Preço:</strong> R$ ${vehicle.price}</p>
                <p><strong>Adicionado por:</strong> ${vehicle.addedBy}</p>
                <button onclick="removeVehicle(${index})">Remover</button>
            </div>
        `;
        vehicleList.appendChild(vehicleItem);
    });
}

// Função para remover veículo
function removeVehicle(index) {
    vehicles.splice(index, 1);
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
    displayVehicles();
}

// Função para limpar o formulário de adição de veículos
function clearAddVehicleForm() {
    document.getElementById('vehicle-name').value = '';
    document.getElementById('vehicle-photo').value = '';
    document.getElementById('pieces-blue').value = '';
    document.getElementById('pieces-green').value = '';
    document.getElementById('vehicle-price').value = '';
}

const express = require('express');
const mongoose = require('mongoose');
const Vehicle = require('./Vehicle'); // Importa o modelo Vehicle
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Conexão com o MongoDB
const uri = 'mongodb+srv://gomessilva02117:<SuaSenhaAqui>@cluster0.0mrxd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Conexão bem-sucedida ao MongoDB!');
})
.catch((error) => {
  console.error('Erro ao conectar ao MongoDB:', error);
});

// Rota para adicionar um veículo
app.post('/vehicles', async (req, res) => {
  const vehicle = new Vehicle(req.body);
  try {
    await vehicle.save();
    res.status(201).send(vehicle);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Rota para listar todos os veículos
app.get('/vehicles', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.send(vehicles);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

