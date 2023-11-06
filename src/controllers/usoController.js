const Uso = require('../models/UsoModel');

exports.index = (req, res) => {
  res.render('uso', {
    uso: {}
  });
};

exports.index_uso = async(req, res) => {
  const usos = await Uso.buscaUsos();

  try {
    if(!usos) return res.render('404');
    res.render('index_uso', { usos }); //como a chave chama usos e a variavel que esta vindo é usos tambem
                                               //não preciso fazer { usos:usos }
  } catch(e) {
      console.log(e);
      return res.render('404');
  }
};

exports.register = async(req, res) => {
  try {
    const uso = new Uso(req.body);
    await uso.register();

    if(uso.errors.length > 0) {
      req.flash('errors', uso.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    req.flash('success', 'Utilização registrada com sucesso.');
    req.session.save(() => res.redirect(`/uso/index_uso/${uso.uso._id}`));
    return;
  } catch(e) {
    console.log(e);
    return res.render('404');
  }
};

exports.editIndex = async function(req, res) {
  if(!req.params.id) return res.render('404');

  const uso = await Uso.buscaPorId(req.params.id);
  if(!uso) return res.render('404');

  res.render('uso', { uso });
};

exports.edit = async function(req, res) {
  try {
    if(!req.params.id) return res.render('404');
    const uso = new Uso(req.body);
    await uso.edit(req.params.id);

    if(uso.errors.length > 0) {
      req.flash('errors', uso.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    req.flash('success', 'Utilização editada com sucesso.');
    req.session.save(() => res.redirect(`/uso/index_uso/`));
    return;
  } catch(e) {
    console.log(e);
    res.render('404');
  }
};

exports.delete = async function(req, res) {
  if(!req.params.id) return res.render('404');

  const uso = await Uso.delete(req.params.id);
  if(!uso) return res.render('404');

  req.flash('success', 'Registro apagado com sucesso.');
  req.session.save(() => res.redirect('back'));
  return;
};
