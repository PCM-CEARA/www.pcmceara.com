from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)

# Configurando a URL do banco de dados
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:wyeJkvxRUGQzUZKjqDMiVwjfuqqEWqDj@autorack.proxy.rlwy.net:50492/railway'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Defina suas classes de modelo aqui

if __name__ == "__main__":
    app.run(debug=True)
