const Contato = require('../models/ContatoModel');
const Login = require('../models/LoginModel');


exports.index = async (req, res) => {

  const email = req.session.email;    //usando a sessão atribuída no LOGINController linha 62
                                    //  porque o método session.get() retorna um objeto 
  console.log('LINHA 7 contato CONTROLLER ' + email);

  const login = new Login();
    const login_email = await login.buscaEmail(email); //retorna com id, re, email, nome, tpUsuario
    console.log('LINHA 12 contato CONTROLLER ' + login_email);

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
    console.log('LINHA 7 USO CONTROLLER ' + email);

    const login       = new Login();
    const login_email = await login.buscaEmail(email);
    
    console.log('LINHA 10 USO CONTROLLER ' + login_email);

  res.render('uso_abrir', {
    uso : {},
    login_email : login_email,
  });
};



exports.validar_login = async(req, res) => {
  const novo_array = [];

  try {
    const login = new Login();  // isso é instanciar
    const login2 = await login.buscaLogins();

    if ( login2 ) {
      // Em resumo, o código (async () => {})(); cria uma função assíncrona vazia e a executa imediatamente, sem realizar nenhuma ação específica
      (async () => {
        for (const log2 of login2) { //Ele itera sobre um array chamado
          
          const id2 = log2._id.toString(); //tem que ser String, que é o armazenado no BD
          const contato = await Contato.busca_validar(id2);
          if (! contato) novo_array.push(log2);
        };            
        console.log(`qtd de registros falta cadastrar: ${novo_array.length}`);
        
        res.render('contato_validar', { novo_array });
      })();
    };
    
  } catch (e) {
    console.log(e);
    return res.render('404');
  }
};

//------------------------------------------------------------------------------------
exports.validar2_login = async(req, res) => {
  const novo_array = [];
  let contador1 = 0;
  let contador2 = 0;

  try {
    const login = new Login();  // isso é instanciar
    const login2 = await login.buscaLogins();
    
    login2.forEach( async( item2 ) => {            
      const id2 = item2._id.toString(); //tem que ser String, que é o armazenado no BD
      const contato = await Contato.busca_validar(id2);
      if (contato) {
        contador1 += 1;
        
      } else {
        contador2 += 1;
        console.log(`LINHA 68 CONTATO CONTROLLER: ${item2}`);
        novo_array.push(item2);
      };
    });
    
    novo_array.forEach( (item3 ) => {
      console.log('LINHA 073 - CONTATO CONTROLLER - ' + item3);

    });
//QUANDO TIRO O NOVO ARRAY DE DENTRO DO FOREACH ELE NÃO CARREGA OS VALORES
    res.render('contato_validar', { novo_array });

  } catch (e) {
    console.log(e);
    return res.render('404');
  }
};


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

    const contato = new Contato(req.body);
    await contato.register();

    if(contato.errors.length > 0) {
      req.flash('errors', contato.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    req.flash('success', 'Contato registrado com sucesso.');
    req.session.tipoUsuario = req.body.tipoUsuario;
    console.log("LINHA 108 CONTATO-CONTROLLER * * * " + req.session.tipoUsuario);
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
