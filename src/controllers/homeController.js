/* const Contato = require('../models/ContatoModel');

exports.index = async(req, res) => {
  const contatos = await Contato.buscaContatos();
  res.render('index', { contatos });
}; */

const Veiculo = require('../models/VeiculoModel');

exports.index = async(req, res) => {
  const veiculos = await Veiculo.buscaVeiculos();
  res.render('index', { veiculos });
};