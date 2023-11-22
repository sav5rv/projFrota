const Login = require('../models/LoginModel');

exports.index = (req, res) => {
  if(req.session.user) return res.render('login-logado');
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
    req.session.tipoUsuario = req.body.tipoUsuario;
    req.session.email = req.body.email;
    //console.log('LINHA 30 LOGIN CONTROLLER ' + req.session.tipoUsuario);
    req.session.save(function() {
      return res.render('login');
    });

  } catch(e) {
    console.log(e);
    return res.render('404');
  }
};

exports.login = async function(req, res) {
  try {
    const login = new Login(req.body);
    await login.login();

    if(login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(function() {
        return res.redirect('back');
      });
      return;
    }

    req.flash('success', 'Você entrou no sistema.');

    req.session.user = login.user;
    //console.log("LINHA 56 LOGINCONTROLLER = = " + login.user);        

    //console.log("LINHA 58 LOGINCONTROLLER = = " + login.user.tipoUsuario);

    //console.log("LINHA 60 LOGINCONTROLLER = = " + req.session.user.tipoUsuario);
    req.session.tipoUsuario = req.body.tipoUsuario;
    req.session.email = req.body.email;
    req.session.save(function() {
      return res.redirect('back');
    });
  } catch(e) {
    console.log(e);
    return res.render('404');
  }
};

exports.logout = function(req, res) {
  req.session.destroy();
  res.redirect('/');
  
};

