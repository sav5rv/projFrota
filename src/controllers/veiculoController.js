const Veiculo = require('../models/VeiculoModel');

exports.index = (req, res) => {
  res.render('veiculo', {
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


                  //solicitado em um AJAX ou FETCH
exports.teste_lista_veiculo = async(req, res) => {

  const veiculos = await Veiculo.buscaPorRodas(req.params.rodas);
  console.log('LINHA 41 VEICULO CONTROLLER ' + veiculos);
  try {
    if(!veiculos) return res.render('404');
    // let x = res.json(veiculos); //retornando um Objeto json = [{"renavan":"987654321","rodas":"3","_id":"65234dd25b1d0b36dcfc2afc"}]

    console.log('LINHA 46 VEICULO CONTROLLER ' + veiculos);
    return;

  } catch(e) {
      console.log(e);
      return res.render('404');
  }
};


exports.register = async(req, res) => {
  try {
    const veiculo = new Veiculo(req.body);
    await veiculo.register();

    if(veiculo.errors.length > 0) {
      req.flash('errors', veiculo.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    req.flash('success', 'Veiculo registrado com sucesso.');
    req.session.save(() => res.redirect(`/veiculo/veiculo_lista/${veiculo.veiculo._id}`));
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

  res.render('veiculo', { veiculo });
};

exports.edit = async function(req, res) {
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
