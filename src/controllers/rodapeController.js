

exports.faleConosco = (req, res) => {
    res.render('rodape_faleConosco', {
      contato: {}
    });
  };


  exports.credito = (req, res) => {
    res.render('rodape_credito');
  };  


  exports.mapaSite = (req, res) => {
    res.render('rodape_mapaSite');
  };
  
  
  exports.sobre = (req, res) => {
    res.render('rodape_sobre');
  };  