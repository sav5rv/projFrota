const Veiculo = require('../models/VeiculoModel');

exports.index = (req, res) => {
  res.render('veiculo', {
    veiculo: {}
  });
};

exports.index_veiculo = async(req, res) => {
  const veiculos = await Veiculo.buscaVeiculos();

  try {
    if(!veiculos) return res.render('404');
    res.render('index_veiculo', { veiculos }); //como a chave chama contatos e a variavel que esta vindo é contatos tambem
                                               //não preciso fazer { contatos:contatos }
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
    req.session.save(() => res.redirect(`/veiculo/index_veiculo/${veiculo.veiculo._id}`));
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
    req.session.save(() => res.redirect(`/veiculo/index_veiculo/`));
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
