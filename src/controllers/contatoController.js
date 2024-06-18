const Contato = require('../models/ContatoModel');
const Login = require('../models/LoginModel');


exports.index = async (req, res) => {

  const email = req.session.email;    //usando a sessão atribuída no LOGINController linha 62
                                    //  porque o método session.get() retorna um objeto 
  //console.log('LINHA 9 contato CONTROLLER ' + email);

  const login = new Login();
    const login_email = await login.buscaEmail(email); //retorna com id, re, email, nome, tpUsuario
    //console.log('LINHA 13 contato CONTROLLER ' + login_email);

    try {
      if(!login_email) res.render('contato_cad', {});
      
      //const login_mail = JSON.stringify( login_email );
      res.render('contato_cad', {
          contato : {}, 
          login_email : login_email,
      });

    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};


exports.contato_abrir = async(req, res) => {

    const email = req.session.email;    //usando a sessão atribuída no LOGINController linha 62
                                    //  porque o método session.get() retorna um objeto 
    console.log('LINHA 35 USO CONTROLLER ' + email);

    const login       = new Login();
    const login_email = await login.buscaEmail(email);
    
    console.log('LINHA 40 USO CONTROLLER ' + login_email);

  res.render('uso_abrir', {
    uso : {},
    login_email : login_email,
  });
};
//----------------------------------------------------------------------------------------------------



exports.login_validar = async(req, res) => {
  const novo_array = [];

  try {
    const login = new Login();  // isso é instanciar
    const login2 = await login.buscaLogins();

    if ( login2 ) {
      // Em resumo, o código (async () => {})(); cria uma função assíncrona vazia e a executa imediatamente, sem realizar nenhuma ação específica
      (async () => {
        for (const log2 of login2) { //Ele itera sobre um array chamado
          console.log(`LINHA 62 CONTATO CONTROLLER ${log2.id}`)
          if(typeof log2.id !== 'string') console.log('NÃO É STRING');
          
          //const id2 = log2._id.toString(); //tem que ser String, que é o armazenado no BD
          
          //console.log(`LINHA 64 CONTATO CONTROLLER ${id2}`)

          const contato = await Contato.busca_validar(log2.id);
          if (!contato) novo_array.push(log2);
          console.log(`qtd de registros falta cadastrar: ${novo_array.length}`);
        };            
        
        res.render('contato_validar', { novo_array });
      })();
    };
    
  } catch (e) {
    console.log(e);
    return res.render('404');
  }
};



//------------------------------------------------------------------------------------
exports.login_validar_lista = async function (req, res) {  
  try {
    if(!req.params.id) return res.render('404');

    const login = new Login();
    //const login_validar = await login.buscaEmail(req.params.email);
    const login_validar = await login.buscaPorId(req.params.id);
      if(!login_validar) return res.render('404');
    
      res.render('login_validar', { login_validar });

  } catch (e) {
      console.log(e);
      return res.render('404');
  }
}



exports.login_validar_register = async function (req, res) { 
  try {
    const contato = new Contato(req.body);
    //console.log('LINHA 85 ' + req.body.email);
    await contato.register();

    if(contato.errors.length > 0) {
      req.flash('errors', contato.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    req.flash('success', 'Contato registrado com sucesso.');
    res.redirect(`/contato/login_validar/`); //executar a função login_validar usar a rota que chama a função

  } catch(e) {
        console.log(e);
        return res.render('404');
  }
}




//------------------------------------------------------------------------------------
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


//===============================================================================================
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
    // const login = new Login(req.body.email);
    // await login.loginExists();

    // if(login.errors.length > 0) {
    //   req.flash('errors', login.errors);
    //   req.session.save(() => res.redirect('back'));
    //   return;
    // }

    const contato = new Contato(req.body);
    console.log('116 contato controlle '+ req.body.email);
    await contato.register();

    if(contato.errors.length > 0) {
      req.flash('errors', contato.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    req.flash('success', 'Contato registrado com sucesso.');
    req.session.tipoUsuario = req.body.tipoUsuario;
    console.log("LINHA 135 CONTATO-CONTROLLER * * * " + req.session.tipoUsuario);
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

    console.log('LINHA 178 CONTATO CONTROLLER ' + req.body.email);

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



exports.login_validar_delete = async function(req, res) {
  if(!req.params.id) return res.render('404');

  const login = new Login(req.body);
  await login.delete(req.params.id);
  if(!login) return res.render('404');

  req.flash('success', 'Log do contato apagado com sucesso.');
  req.session.save(() => res.redirect('back'));
  return;
}
