let loggedInUser = null;
let vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];

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

            // Envia a atualização para todos os clientes conectados
            socket.emit('updateVehicles', vehicles);
        };
        reader.readAsDataURL(vehiclePhoto);
    }
}

function removeVehicle(index) {
    vehicles.splice(index, 1);
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
    displayVehicles();

    // Envia a atualização para todos os clientes conectados
    socket.emit('updateVehicles', vehicles);
}

// Outras funções...
