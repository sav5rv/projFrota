const Login = require('../models/LoginModel');

exports.index = (req, res) => {  
  return res.render('login');
};


exports.criar = (req, res) => {
  return res.render('login_criar');
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
      //return res.redirect('login-logado', { login2 });
      // return res.redirect('back');
      
    // });

  } catch(e) {
    console.log(e);
    return res.render('404');
  }
};



exports.logado = async function(req,res) {
  const login2 = req.session.user;
  return res.render('login-logado', { login2 });
}



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



exports.logout = function(req, res) {
  req.session.destroy();
  res.redirect('/');
  
};

