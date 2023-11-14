const Veiculo = require('../models/VeiculoModel');

exports.index = (req, res) => {
  res.render('./teste01/index', {
    veiculo: {}
  });
};

/* exports.index_veiculo = async(req, res) => {
  const veiculos = await Veiculo.buscaVeiculos();

  try {
    if(!veiculos) return res.render('404');
    res.render('./teste01/dtTable', { veiculos }); //como a chave chama veiculos e a variavel que esta vindo é veiculos tambem
                                               //não preciso fazer { veiculos:veiculos }
  } catch(e) {
      console.log(e);
      return res.render('404');
  }
}; */




exports.index_veiculo = async( req, res) => {
  const veiculos = await Veiculo.buscaVeiculos();

  try {
    if(!veiculos) return res.render('404');
    const dadosVeiculos = JSON.stringify(veiculos);
    console.log( 'LINHA 31 TESTE01 CONTROLLER ' + dadosVeiculos );
    res.render('./teste01/dtTable', { dadosVeiculos });

  }

  catch(e){
    console.log(e);
    return res.render('404');
  }
};
