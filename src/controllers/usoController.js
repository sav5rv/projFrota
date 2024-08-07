const Uso     = require('../models/UsoModel');
const Contato = require('../models/ContatoModel');
const Login   = require('../models/LoginModel');



exports.uso_abrir = async(req, res) => {

    const email = req.session.email;    //usando a sessão atribuída no LOGINController linha 62
                                    //  porque o método session.get() retorna um objeto 
    // console.log('LINHA 7 USO CONTROLLER ' + email);

    const login       = new Login();
    const login2 = await login.buscaEmail(email);

  res.render('uso_abrir', {
    uso : {},
    login2 : login2,
  });
};





exports.uso_finalizar = async(req, res) => {

  if(!req.params.id) return res.render('404');

  const id = req.params.id;

  const uso = await Uso.buscaPorId(id);
    if(!uso) return res.render('404');

  const email = uso.email;          //usando a sessão atribuída no LOGINController linha 62
                                    //porque o método session.get() retorna um objeto 
  const login       = new Login();
  const login_email = await login.buscaEmail(email);
  
  if(!login_email) {
    req.flash('errors', `Esse registro não pode ser finalizado. - - - O usuário (${email}) não foi localizado! - - - Crie uma conta para ele na tela LOGIN.`);
    req.session.save(() => res.redirect('back'));
    return;
  } else {
    res.render('uso_finalizar', {
      uso : uso,
      login_email: login_email,
    });
  };
};





exports.uso_lista = async(req, res) => {
  const tipoUsuario = req.session.user.tipoUsuario;
  // const email       = res.locals.user.email;
  const email       = req.session.user.email;
  
  //console.log('LINHA 49 USOCONTROLLER: ' + email);
  if (tipoUsuario == 'Administrador' ) {
    const usos = await Uso.buscaUsos();

    try {
      if(!usos) return res.render('404');
      res.render('uso_lista', { usos }); //como a chave chama usos e a variavel que esta vindo é usos tambem
                                                 //não preciso fazer { usos:usos }
    } catch(e) {
        console.log(e);
        return res.render('404');
    }
  } else {
    const usos = await Uso.buscaUsoEmail(email);

    try {
      if(!usos) return res.render('404');
      res.render('uso_lista', { usos });

    } catch(e) {
        console.log(e);
        return res.render('404');
    }
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

    req.flash('success', 'Registro salvo com sucesso.');
    req.session.save(() => res.redirect(`/uso/uso_lista/`));
    return;

  } catch(e) {
    console.log(e);
    return res.render('404');
  }
};






//botão editar clicado na lista
exports.editIndex = async function(req, res) {
  if(!req.params.id) return res.render('404');

  const id = req.params.id;

  const uso = await Uso.buscaPorId(id);
    if(!uso) return res.render('404');


  const login = new Login(); //vou precisar para preencher outros input que não estão salvos no banco dados uso
  const login2 = await login.buscaEmail(uso.email);

  if(!login2) {
    req.flash('errors', `Esse registro não pode ser editado. - - - O usuário (${uso.email}) não foi localizado! - - - Crie uma conta na tela Login.`);
    req.session.save(() => res.redirect('back'));
    return;
  } else {
    res.render('uso_abrir', {
      uso : uso,
      login2: login2,
    });
  };
    
  //res.render('uso_abrir', { uso, login2 });
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

    req.flash('success', 'Registro editado com sucesso.');
    req.session.save(() => res.redirect(`/uso/uso_lista/`));
    return;

  } catch(e) {
    console.log(e);
    res.render('404');
  }
};





exports.delete = async function(req, res) {
  const id = req.params.id;
  if(!id) return res.render('404', { error: 'ID não fornecido.' });

  const uso = await Uso.delete(id);
  if(!uso) return res.render('404', { error: `Registro com ID: ${id} não encontrado.` });

  req.flash('success', `Registro id: ${id} apagado com sucesso.`);
  req.session.save(() => res.redirect(`/uso/uso_lista/`));
  return;
};
