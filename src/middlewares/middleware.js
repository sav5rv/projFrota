exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors  = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.user    = req.session.user;
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



exports.loginRequiredADM = (req, res, next) => {
  if(!req.session.user) {
    req.flash('errors', 'Você precisa fazer login.');
    req.session.save(() => res.redirect('/'));
    return;
  }

  if(req.session.user.tipoUsuario != "Administrador") {
    //console.log("LINHA 51 MIDDLEWARE = = " + req.session.user.tipoUsuario);
    req.flash('errors', 'Perfil não permitido.');
    req.session.save(() => res.redirect('/'));
    return;
  }
  //console.log("LINHA 49 MIDDLEWARE = = " + req.session.user.tipoUsuario);
  next();
};