const Login = require('../models/LoginModel');
const Contato = require('../models/ContatoModel');


exports.index = (req, res) => {  
  return res.render('login_index');
};


exports.criar = (req, res) => {  
  return res.render('login_criar');
};



exports.alterar = async function(req, res) {
  return res.render('login_alterar');  
};


exports.esqueci = async function(req, res) {
  return res.render('login_esqueci');  
};



exports.register = async function(req, res) {
  try {
    const login = new Login(req.body);
    await login.register();

    if(login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(function() {
        return res.redirect('back');
      });
      return;
    }

    req.flash('success', 'Seu usuário foi criado com sucesso.');
    const login2 = login.login;
    console.log("LINHA 29 LOGINCONTROLLER = = " + login2);    

    req.session.login        = login.login;
    req.session.tipoUsuario = req.body.tipoUsuario;
    req.session.email       = req.body.email;

    req.session.save(() => res.redirect(`/login/index/`));
    return;
    // req.session.save(function() {
      //return res.redirect('login_logado', { login2 });
      // return res.redirect('back');
      
    // });

  } catch(e) {
    console.log(e);
    return res.render('404');
  }
};


exports.login_dtTable = async function(req, res) {
  
  const login = new Login();
  const logins = await login.buscaLogins();

  try {
    if(!logins) return res.render('404');
    const str_logins = JSON.stringify( logins );
    res.render('login_dtTable', { str_logins });

  } catch (error) {
    console.log(error);
    return res.render('404');
  }
};



exports.alterar_senha = async function(req, res) {
  try {
    const login = new Login(); //instanciando o obj login da classe Login

    const email     = req.body.email;
    const re        = req.body.re;
    const password  = req.body.password;
    const senhaNova = req.body.senhaNova;

    await login.alterar_senha( email, password, re, senhaNova ); //chamando a função da classe

    if(login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    req.flash('success', 'Senha alterada com sucesso.');
    req.session.save(() => res.redirect(`/login/index/`));
    return;
    
  } catch (e) {
      console.log(e);
      return res.render( '404');
    }
 
};




exports.esqueci_senha = async function(req, res) {
  try {
    const login = new Login(); //instanciando o obj login da classe Login
    const contato = new Contato();

    const email       = req.body.email;
    const re          = req.body.re;
    const nome        = req.body.nome;
    const cnhRegistro = req.body.cnhRegistro;

    await login.esqueci_senha( email, re, nome ); //chamando a função da classe

    if(login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    await contato.esqueci_senha(cnhRegistro);

    if(contato.errors.length > 0) {
      req.flash('errors', contato.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }
    
    await login.gerar_senha(email, re);

    req.flash('success', `Sua nova senha é: ${login.login}`); //é login.login, pq estou atribuindo um valor direto na linha 156 em LoginModel
    req.session.save(() => res.redirect(`/login/index/`));
    return;
    
  } catch (e) {
      console.log(e);
      return res.render( '404');
    }
 
};





exports.lista_email_login = async function(req, res) {
  try {
    const login = new Login(); //instanciando o obj login da classe login
    await login.buscaLogins(); //chamando a função da classe

    const array_de_obj = login.login; //{ nome: 'Adm da Frota', email: '123@123.com' },{ nome: 'qwer', email: '3@3.com' },

      // estou enviando resposta de uma solicitação FETCH
    //console.log('LINHA 65 login CONTROLLER ' + array_de_obj); está dando somente como object
      
      //envia um array de objetos
      res.send(array_de_obj);
      
      //se eu não usar login.login vai trazer o array errors junto
      //login.login é o nome do array
      //detro desse array temos objetos com duas propriedades
      //uma com nome renavan e outra com nome rodas 
      //{ renavan: '123456789', rodas: '4', _id: 652348bf0e056336b4e81bfa },{ renavan: '123006789', rodas: '4', _id: 65676e9864aa66fbd77ffa78 }              
  
      
  } catch (e) {
      console.log(e);
      return res.render( '404');
    }

};


//------------------------------------------------------------------------------------------------------------------
exports.login = async function(req, res) {
  try {
    const login = new Login(req.body);
    await login.log();

    if(login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(function() {
        return res.redirect('back');
      });
      return;
    }

    req.flash('success', 'Você entrou no sistema.');

    req.session.user = login.login;
    //está atribuindo a variavel Global definida no middleware com a q veio do Login Model

    // console.log("LINHA 72 LOGIN CONTROLLER = = " + req.session.user);  
    
    // console.log("LINHA 75 LOGIN CONTROLLER = = " + login.login);        

    // console.log("LINHA 77 LOGIN CONTROLLER = = " + login.login.tipoUsuario);

    // console.log("LINHA 79 LOGIN CONTROLLER = = " + req.session.login.tipoUsuario);

    req.session.tipoUsuario = req.body.tipoUsuario;
    req.session.email       = req.body.email;

    req.session.save(() => res.redirect(`/login/logado/`));
    // redirecionei para uma rota, em que essa rota renderiza a pagina juntamente com os parametros e as msg
    return;

  } catch(e) {
    console.log(e);
    return res.render('404');
  }
};



exports.logado = async function(req,res) {
  const login2 = req.session.user;
  return res.render('login_logado', { login2 });
}




exports.logout = function(req, res) {
  req.session.destroy();
  res.redirect('../fim.html');
  // res.send('USUÁRIO DESCONECTADO');
  
  
};



