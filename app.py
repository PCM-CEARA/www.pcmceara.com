import os
from flask import Flask, request, render_template, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Limite de 16MB

# Conexão ao banco de dados MySQL usando a variável de ambiente
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    foto = db.Column(db.String(200), nullable=False)

# Cria o banco de dados se não existir
with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/registro')
def registro():
    usuarios = Usuario.query.all()
    return render_template('registro.html', usuarios=usuarios)

@app.route('/registrar', methods=['POST'])
def registrar():
    nome = request.form['nome']
    foto = request.files['foto']

    if foto:
        filename = secure_filename(foto.filename)
        foto.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        novo_usuario = Usuario(nome=nome, foto=f'uploads/{filename}')
        db.session.add(novo_usuario)
        db.session.commit()

    return redirect(url_for('registro'))

if __name__ == '__main__':
    app.run(debug=True)
