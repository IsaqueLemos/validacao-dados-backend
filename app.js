const validadores = require('./utils/validadores')
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const PORT = process.env.PORT || 3000;
const app = express();

// Configurações da Aplicação
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rotas
app.get('/', (_, res) => {
  res.render('formulario', { erros: [], dados: {} });
})

app.post('/submeter', (req, res) => {
  const errors = [];

  if (!validadores.validarCampos(req.body)) {
    errors.push('Todos os campos são obrigatórios');
  }

  if (!validadores.validarEmail(req.body.email)) {
    errors.push('Email inválido');
  }

  if (!validadores.validarDataNascimento(req.body.dataNascimento)) {
    errors.push('Data de nascimento inválida');
  }

  if (!validadores.validarDDD(req.body.ddd)) {
    errors.push('DDD inválido');
  }

  if (!validadores.validarAtividades(req.body.atividades)) {
    errors.push('Selecione até 3 atividades');
  }

  if (errors.length) {
    res.status(400).render('formulario', { erros: errors, dados: req.body });
  } else {
    res.render('sucesso', { dados: req.body });
  }
})

// Inicialização do Servidor
app.listen(PORT, () => {
  console.log('Servidor rodando na porta 3000');
  console.log('Acesse http://localhost:3000');
})
