exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.user = req.session.user;
  next();
};

exports.outroMiddleware = (req, res, next) => {
  next();
};

exports.checkCsrfError = (err, req, res, next) => {
  if(err) {
    return res.render('404');
  }

  next();
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

exports.loginRequired = (req, res, next) => {
  if(!req.session.user) {
    req.flash('errors', 'Você precisa fazer login.');
    req.session.save(() => res.redirect('/'));
    return;
  }

  next();
};
// a lógica é esse fazer o msm que o anterior mais alguma coisa
// na rota irei usar apenas um nos menus que necessitam que o 
// usuario seja ADM
// dúvida como definir essa session?
// vouu cadastrar o usuário e definir seu privilegio
// o acesso aom menu login, home, rodape é liberado de login
// o acesso ao menu despesa e uso tendo senha já pode acessar
// o acesso ao menu contato e veículo somente ADM ou AUX(?)

exports.loginRequiredADM = (req, res, next) => {
  if(!req.session.user) {
    req.flash('errors', 'Você precisa fazer login.');
    req.session.save(() => res.redirect('/'));
    return;
  }

  if(req.session.atividade != "adm") {
    req.flash('errors', 'Você não tem privilégio de administrador.');
    req.session.save(() => res.redirect('/'));
    return;
  }

  next();
};