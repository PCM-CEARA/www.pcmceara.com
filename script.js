let loggedInUser = null;
let vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];

function showLoginForm() {
  document.getElementById('login-form').style.display = 'block';
  document.getElementById('register-form').style.display = 'none';
}

function showRegisterForm() {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('register-form').style.display = 'block';
}

function login() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  if (localStorage.getItem(username) === password) {
    loggedInUser = username;
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    displayVehicles();
  } else {
    alert('Usuário ou senha inválidos.');
  }
}

function register() {
  const username = document.getElementById('register-username').value;
  const password = document.getElementById('register-password').value;

  if (!localStorage.getItem(username)) {
    localStorage.setItem(username, password);
    alert('Registro realizado com sucesso! Faça login agora.');
    showLoginForm();
  } else {
    alert('Usuário já existe.');
  }
}

function logout() {
  loggedInUser = null;
  document.getElementById('auth-section').style.display = 'block';
  document.getElementById('main-content').style.display = 'none';
}

function addVehicle() {
  const vehicleName = document.getElementById('vehicle-name').value;
  const vehiclePhoto = document.getElementById('vehicle-photo').files[0];
  const piecesBlue = document.getElementById('pieces-blue').value;
  const piecesGreen = document.getElementById('pieces-green').value;
  const vehiclePrice = document.getElementById('vehicle-price').value;

  if (vehiclePhoto) {
    const reader = new FileReader();
    reader.onload = function(e) {
      vehicles.push({
        name: vehicleName,
        photo: e.target.result,
        piecesBlue: piecesBlue,
        piecesGreen: piecesGreen,
        price: vehiclePrice,
        addedBy: loggedInUser
      });
      localStorage.setItem('vehicles', JSON.stringify(vehicles));
      displayVehicles();
      clearAddVehicleForm(); // Limpar o formulário após adicionar
    };
    reader.readAsDataURL(vehiclePhoto);
  }
}

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
      </div>
    `;

    // Botão de remover aparece para todos os usuários
    if (vehicle.addedBy === loggedInUser) {
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remover Veículo';
      removeButton.onclick = () => removeVehicle(index);
      vehicleItem.appendChild(removeButton);
    }

    vehicleList.appendChild(vehicleItem);
  });
}

function removeVehicle(index) {
  vehicles.splice(index, 1);
  localStorage.setItem('vehicles', JSON.stringify(vehicles));
  displayVehicles();
}

function clearAddVehicleForm() {
  document.getElementById('vehicle-name').value = '';
  document.getElementById('vehicle-photo').value = '';
  document.getElementById('pieces-blue').value = '';
  document.getElementById('pieces-green').value = '';
  document.getElementById('vehicle-price').value = '';
}
