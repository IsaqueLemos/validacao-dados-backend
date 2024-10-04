const ddsNacionais = require('./dddsNacionais');

module.exports = {
  validarEmail: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  validarDataNascimento: (value) => new Date() > new Date(value),
  validarDDD: (value) => ddsNacionais.includes(value),
  validarAtividades: (value = []) => value.length <= 3,
  validarCampos: (value) => {
    const campos = ['nomeAluno', 'dataNascimento', 'nomeMae', 'nomePai', 'ddd', 'telefone', 'email', 'serie', 'turno'];
    return campos.every(campo => value[campo]);
  }
}
