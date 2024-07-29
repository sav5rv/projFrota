const Veiculo = require('../models/VeiculoModel');

exports.index = (req, res) => {
  res.render('veiculo_cad', {
    veiculo: {}
  });
};

exports.veiculo_lista = async(req, res) => {
  const veiculos = await Veiculo.buscaVeiculos();

  try {
    if(!veiculos) return res.render('404');
    res.render('veiculo_lista', { veiculos }); //como a chave chama veiculos e a variavel que esta vindo é veiculos tambem
                                               //não preciso fazer { veiculos:veiculos }
  } catch(e) {
      console.log(e);
      return res.render('404');
  }
};


exports.lista_placa = async(req, res) => {
  const placa = await Veiculo.lista_placa(); //retorna um array de objetos JSON

  try {
    // estou enviando resposta de uma solicitação FETCH
    const data = JSON.stringify( placa ); //converte o array de objetos placa em uma string JSON
    //envia a string JSON
    res.send(placa);// não é um obj json é uma string = { renavan: '123456789', rodas: '4', _id: 652348bf0e056336b4e81bfa },{ renavan: '123006789', rodas: '4', _id: 65676e9864aa66fbd77ffa78 }              

    //console.log('LINHA 30 VEICULO CONTROLLER ' + placa);
    //console.log('LINHA 31 VEICULO CONTROLLER ' + data);
  } catch (e) {
    console.log(e);
    return res.render( '404');
  }
};


exports.lista_veiculo = async(req, res) => {
  const veiculos = await Veiculo.buscaVeiculos();

  try {
    if(!veiculos) return res.render('404');
    const str_veiculos = JSON.stringify( veiculos );
    res.render('veiculo_dtTable', { str_veiculos }); 

  } catch(e) {
      console.log(e);
      return res.render('404');
  }
};



                 //solicitado via AJAX em veiculo_dtTable.ejs
exports.veiculo_dtTable = async(req, res) => {
  const veiculos = await Veiculo.buscaVeiculos();

  try {
    if(!veiculos) return res.render('404', { error: `erro no veiculoController linha 62` });
    const data = veiculos;

    res.json({ data: data });  //retorna um JSON

  } catch(e) {
      console.log(e);
      return res.render('404');
  }
};


                  //solicitado em um AJAX ou FETCH
exports.teste_lista_veiculo = async(req, res) => {

  const veiculos = await Veiculo.buscaPorRodas(req.params.rodas);
  //console.log('LINHA 41 VEICULO CONTROLLER ' + veiculos);
  try {
    if(!veiculos) return res.render('404');
    //res.json(veiculos); 
    res.send(veiculos);// não é um obj json = { renavan: '123456789', rodas: '4', _id: 652348bf0e056336b4e81bfa },{ renavan: '123006789', rodas: '4', _id: 65676e9864aa66fbd77ffa78 }

    console.log('LINHA 48 VEICULO CONTROLLER ' + veiculos);

    

  } catch(e) {
      console.log(e);
      return res.render('404');
  }
};



exports.register = async (req, res) => {
  try {
    const veiculo = new Veiculo(req.body);
    await veiculo.register();

    if(veiculo.errors.length > 0) {
      req.flash('errors', veiculo.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    req.flash('success', 'Veiculo registrado com sucesso.');
    req.session.save(() => res.redirect(`/veiculo/veiculo_lista/`));
    return;

  } catch(e) {
    console.log(e);
    return res.render('404');
  }
};


exports.editIndex = async function(req, res) {
  if(!req.params.id) return res.render('404');

  const veiculo = await Veiculo.buscaPorId(req.params.id);
  if(!veiculo) return res.render('404');

  res.render('veiculo_cad', { veiculo });
};


exports.edit = async function (req, res) {
  try {
    if(!req.params.id) return res.render('404');
    const veiculo = new Veiculo(req.body);
    await veiculo.edit(req.params.id);

    if(veiculo.errors.length > 0) {
      req.flash('errors', veiculo.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    req.flash('success', 'Veiculo editado com sucesso.');
    req.session.save(() => res.redirect(`/veiculo/veiculo_lista/`));
    return;

  } catch(e) {
    console.log(e);
    res.render('404');
  }
};


exports.delete = async function(req, res) {
  if(!req.params.id) return res.render('404');

  const veiculo = await Veiculo.delete(req.params.id);
  if(!veiculo) return res.render('404');

  req.flash('success', 'Veiculo apagado com sucesso.');
  req.session.save(() => res.redirect('back'));
  return;
};
