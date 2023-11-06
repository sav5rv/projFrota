

exports.index_faleConosco = (req, res) => {
    res.render('faleConosco', {
      contato: {}
    });
  };


  exports.index_credito = (req, res) => {
    res.render('credito');
  };  


  exports.index_mapaSite = (req, res) => {
    res.render('mapaSite');
  };
  
  
  exports.index_sobre = (req, res) => {
    res.render('sobre');
  };  