const Despesa = require('../models/DespesaModel');



exports.index = (req, res) => {
  const email = req.session.email;

  res.render('despesa', {
    despesa: {},
    email: email,
  });
};



exports.grafico = async(req, res) => {
  try{
    const desp1 = await Despesa.buscaGrafico1();
    const despesas1 = JSON.stringify( desp1 );

    const desp2 = await Despesa.buscaGrafico2();
    const despesas2 = JSON.stringify( desp2 );

    const desp3 = await Despesa.buscaGrafico3();
    const despesas3 = JSON.stringify( desp3 );

    const desp5 = await Despesa.buscaGrafico5();
    const despesas5 = JSON.stringify( desp5 );

    res.render('despesa_grafico', { 
      despesas1,  
      despesas2, 
      despesas3,
      despesas5
    });
  }
  catch(e) {
    console.log(e);
    return res.render('404');
  }
};



exports.despesa_lista = async(req, res) => {
  const tipoUsuario = req.session.user.tipoUsuario;
  const email       = req.session.user.email;

  
  try {
    if ( tipoUsuario == 'Administrador' ) { 
      const despesas = await Despesa.buscaDespesas();

      if(!despesas) return res.render('404');
      res.render('despesa_lista', { despesas }); //como a chave chama contatos e a variavel que esta vindo é contatos tambem
                                                 //não preciso fazer { contatos:contatos }
    } else {
      const despesas = await Despesa.buscaDespesaEmail(email);

      if(!despesas) return res.render('404');
      res.render('despesa_lista', { despesas });
    }

  } catch(e) {
      console.log(e);
      return res.render('404');
  }
};




exports.register = async(req, res) => {
  try {
    const despesa = new Despesa(req.body);
    await despesa.register();

    if(despesa.errors.length > 0) {
      req.flash('errors', despesa.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    req.flash('success', 'Despesa registrada com sucesso!');
    req.session.save(() => res.redirect(`/despesa/despesa_lista`));
    return;

  } catch(e) {
    console.log(e);
    return res.render('404');
  }
};



exports.editIndex = async function(req, res) {
  if(!req.params.id) return res.render('404');

  const despesa = await Despesa.buscaPorId(req.params.id);
  if(!despesa) return res.render('404');

  res.render('despesa', { despesa });
};



exports.edit = async function(req, res) {
  try {
    if(!req.params.id) return res.render('404');
    const despesa = new Despesa(req.body);
    await despesa.edit(req.params.id);

    if(despesa.errors.length > 0) {
      req.flash('errors', despesa.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    req.flash('success', 'Despesa editado com sucesso.');
    req.session.save(() => res.redirect(`/despesa/despesa_lista/`));
    return;

  } catch(e) {
    console.log(e);
    res.render('404');
  }
};

exports.delete = async function(req, res) {
  if(!req.params.id) return res.render('404');

  const despesa = await Despesa.delete(req.params.id);
  if(!despesa) return res.render('404');

  req.flash('success', 'Despesa apagada com sucesso.');
  req.session.save(() => res.redirect('back'));
  return;
};
