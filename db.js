const mongoose = require('mongoose');

// Substitua a senha e outras informações conforme necessário
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
