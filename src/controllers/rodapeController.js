const RodapeModel = require('../models/RodapeModel');


exports.faleConosco = (req, res) => {
    res.render('rodape_faleConosco');
  };

// não deu certo
// quando tento acessar essa rota com fetch POST, não consigo enviar dados
// e nem receber o retorno do res.json
// dá um erro que estou recebendo html, eu acho que é a pág de erro 404 que eu criei
  // exports.CAB = (req, res) => {
  //   console.log(req.body);
  //   const { nome, mensagem } = req.body;
  //   console.log(`Nome: ${nome}`);
  //   console.log(`Mensagem: ${mensagem}`);
  //   res.json({ message: 'RETORNO DO SERVIDOR 3030'});

  // };


  exports.emailEnviar = (req, res) => {

    console.log(`Nome: ${req.body.fale_nome}`);
    console.log(`Mensagem: ${req.body.fale_mensagem}`);
    res.send('RETORNO DO SERVIDOR 3030 - não no formato JSON');
  }


  exports.credito = (req, res) => {
    res.render('rodape_credito');
  };  


  exports.mapaSite = (req, res) => {
    res.render('rodape_mapaSite');
  };
  
  
  exports.sobre = (req, res) => {
    res.render('rodape_sobre');
  };  