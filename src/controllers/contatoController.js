const Contato = require('../models/ContatoModel');
const Login = require('../models/LoginModel');


exports.index = async (req, res) => {

  const email = req.session.email;    //usando a sessão atribuída no LOGINController linha 62
                                    //  porque o método session.get() retorna um objeto 
    console.log('LINHA 7 contato CONTROLLER ' + email);

  const login = new Login();
    const login_email = await login.buscaEmail(email);
    
    console.log('LINHA 14 contato CONTROLLER ' + login_email);

    try {
      if(!login_email) res.render('contato_cad', {});
      
      //const login_mail = JSON.stringify( login_email );
      res.render('contato_cad', { 
          contato : {}, 
          login_email : login_email,
      });

      // console.log("LINHA 15 CONTATO CONTROLLER " + login2);
      // console.log("LINHA 16 CONTATO CONTROLLER " + login_mail);

    } catch (e) {
        console.log(e);
        return res.render('404');
    }

};


exports.contato_abrir = async(req, res) => {

    const email = req.session.email;    //usando a sessão atribuída no LOGINController linha 62
                                    //  porque o método session.get() retorna um objeto 
    console.log('LINHA 7 USO CONTROLLER ' + email);

    const login       = new Login();
    const login_email = await login.buscaEmail(email);
    
    console.log('LINHA 10 USO CONTROLLER ' + login_email);

  res.render('uso_abrir', {
    uso : {},
    login_email : login_email,
  });
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


exports.contato_lista = async(req, res) => {
  const contatos = await Contato.buscaContatos();

  try {
    if(!contatos) return res.render('404');
    res.render('contato_lista', { contatos }); //como a chave chama contatos e a variavel que esta vindo é contatos tambem
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
    res.render('contato_dtTable', { str_contatos }); 

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
    console.log("LINHA 84 CONTATO-CONTROLLER * * * " + req.session.tipoUsuario);
    //req.session.save(() => res.redirect(`/contato/contato_lista/${contato.contato._id}`));
    req.session.save(() => res.redirect(`/contato/contato_lista/`));
    return;

  } catch(e) {
      console.log(e);
      return res.render('404');
  }
};



exports.editIndex = async function(req, res) {
  
  try {
    if(!req.params.id) return res.render('404');

    const contato = await Contato.buscaPorId(req.params.id);
      if(!contato) return res.render('404');

    const login = new Login();
      const login2 = await login.buscaLogins();
    
    const login_mail = JSON.stringify( login2 );
    res.render('contato_cad', { contato, login_mail });

  } catch (e) {
      console.log(e);
      return res.render('404');
  }
};



exports.edit = async function(req, res) {
  try {
    if(!req.params.id) return res.render('404');

    const contato = new Contato(req.body);
    await contato.edit(req.params.id);

    console.log('LINHA 153 CONTATO CONTROLLER ' + req.body.email);

    const login = new Login(req.body);
    await login.edit(req.body.email);

    if( contato.errors.length > 0 || login.errors.length > 0 ) {
      req.flash('errors', contato.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }


    req.flash('success', 'Contato editado com sucesso.');
    /* req.session.save(() => res.redirect(`/contato/contato_lista/${contato.contato._id}`)); para chama id ESPECIFICO*/
    req.session.save(() => res.redirect('/contato/contato_lista/'));
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
