const Contato = require('../models/ContatoModel');
const Login = require('../models/LoginModel');


exports.index = async (req, res) => {
  const login = new Login();
    const login2 = await login.buscaLogins();

    try {
      if(!login2) res.render('contato', {});
      
      const str_login = JSON.stringify( login2 );
      res.render('contato', { contato : {}, str_login });

      console.log("LINHA 15 CONTATO CONTROLLER " + login2);
      console.log("LINHA 16 CONTATO CONTROLLER " + str_login);

    } catch (e) {
        console.log(e);
        return res.render('404');
    }

};


// exports.usuarioExiste = async (req, res) => {
//   const login = new Login();
//     const login2 = await login.userExists();

//   try {
//     res.render('contato', { contato, login2 });

//   } catch (e) {
//       console.log(e);
//       return res.render('404');
//   }

// };

exports.index_contato = async(req, res) => {
  const contatos = await Contato.buscaContatos();

  try {
    if(!contatos) return res.render('404');
    res.render('index_contato', { contatos }); //como a chave chama contatos e a variavel que esta vindo é contatos tambem
                                               //não preciso fazer { contatos:contatos }
  } catch(e) {
      console.log(e);
      return res.render('404');
  }
};



exports.lista_contato = async(req, res) => {
  const contatos = await Contato.buscaContatos();

  try {
    if(!contatos) return res.render('404');
    const str_contatos = JSON.stringify( contatos );
    res.render('dtTable_contato', { str_contatos }); 

  } catch(e) {
      console.log(e);
      return res.render('404');
  }
};



exports.register = async(req, res) => {
  try {
    const contato = new Contato(req.body);
    await contato.register();

    if(contato.errors.length > 0) {
      req.flash('errors', contato.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    req.flash('success', 'Contato registrado com sucesso.');
    req.session.tipoUsuario = req.body.tipoUsuario;
    console.log("LINHA 35 CONTATO-CONTROLLER * * * " + req.session.tipoUsuario);
    req.session.save(() => res.redirect(`/contato/index_contato/${contato.contato._id}`));
    return;

  } catch(e) {
      console.log(e);
      return res.render('404');
  }
};

exports.editIndex = async function(req, res) {
  if(!req.params.id) return res.render('404');

  const contato = await Contato.buscaPorId(req.params.id);
  if(!contato) return res.render('404');

  res.render('contato', { contato });
};

exports.edit = async function(req, res) {
  try {
    if(!req.params.id) return res.render('404');
    const contato = new Contato(req.body);
    await contato.edit(req.params.id);

    if(contato.errors.length > 0) {
      req.flash('errors', contato.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    req.flash('success', 'Contato editado com sucesso.');
    /* req.session.save(() => res.redirect(`/contato/index_contato/${contato.contato._id}`)); para chama id ESPECIFICO*/
    req.session.save(() => res.redirect('/contato/index_contato/'));
    return;

  } catch(e) {
      console.log(e);
      res.render('404');
  }
};

exports.delete = async function(req, res) {
  if(!req.params.id) return res.render('404');

  const contato = await Contato.delete(req.params.id);
  if(!contato) return res.render('404');

  req.flash('success', 'Contato apagado com sucesso.');
  req.session.save(() => res.redirect('back'));
  return;
};
