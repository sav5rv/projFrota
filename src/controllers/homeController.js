const Contato = require('../models/ContatoModel');
const Veiculo = require('../models/VeiculoModel');
const Login = require('../models/LoginModel');


exports.index = async(req, res) => {
  const veiculos = await Veiculo.buscaVeiculos();
  const contatos = await Contato.buscaContatos();
  const login = new Login();
    const login2 = await login.buscaLogins();
  
  
  res.render('index', { veiculos, contatos, login2 });
};