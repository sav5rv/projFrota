const Despesa = require('../models/DespesaModel');



exports.index = (req, res) => {
  const email = req.session.email;

  res.render('despesa', {
    despesa: {},
    email: email,
  });
};



exports.grafico = async(req, res) => {
  try{
    const desp1 = await Despesa.buscaGrafico1();
    const despesas1 = JSON.stringify( desp1 );

    const desp2 = await Despesa.buscaGrafico2();
    const despesas2 = JSON.stringify( desp2 );

    const desp5 = await Despesa.buscaGrafico5();
    const despesas5 = JSON.stringify( desp5 );

    res.render('despesa_grafico', { 
      despesas1,  
      despesas2, 
      despesas5
    });
  }
  catch(e) {
    console.log(e);
    return res.render('404');
  }
};


exports.dados_grafico2 = async function(req, res) {
  const tipoDespesa = req.params.tipoDespesa;
  //console.log(`linha 42 Despesa Controller ${tipoDespesa}`);
  
  try {
    const dados2 = await Despesa.dados_grafico2(tipoDespesa);
    
    const dadosTransformados = dados2.map(item => ({
      data: item._id.data,
      totalValor: item.totalValor,
    }));

    const dados_grafico2 = JSON.stringify( dadosTransformados );
    //console.log(dadosTransformados);

    res.render('despesa_grafico2', {
      dados_grafico2,
      tipoDespesa
    });

  } catch (error) {
    console.log(error);
    return res.render('404');
  }
};


//resposta do FETCH em grafico1
exports.dados_grafico1 = async function(req, res) {
  try {
    const dados = await Despesa.dados_grafico1();
    // Os dados retornados através do Node.js de uma consulta no banco MongoDB têm a estrutura de uma lista de objetos JavaScript.
    // Cada objeto representa um documento do MongoDB e tem a seguinte estrutura:
    // Um campo _id que contém um objeto com a chave data (uma string representando uma data no formato "MM-YYYY").
    // Um campo totalValor que contém um número (representando um valor total associado àquela data).

    const dadosTransformados = dados.map(item => ({
      data: item._id.data,
      totalValor: item.totalValor
    }));
  
    console.log(dadosTransformados);

    res.json(dadosTransformados);

  } catch (error) {
    res.status(500).send(error);
  }
};



exports.grafico1 = async function(req, res) {
  try{
    res.render('despesa_grafico1');

  } catch (e) {
    console.log(e);
    return res.render('404');
  }
};



exports.despesa_lista = async(req, res) => {
  const tipoUsuario = req.session.user.tipoUsuario;
  const email       = req.session.user.email;

  
  try {
    if ( tipoUsuario == 'Administrador' ) { 
      const desp = await Despesa.buscaDespesas();
      despesas = JSON.stringify( desp );
      console.log(despesas);
      
      if(!despesas) return res.render('404');
      res.render('despesa_lista', { despesas }); //como a chave chama contatos e a variavel que esta vindo é contatos tambem
                                                 //não preciso fazer { contatos:contatos }
    } else {
      const desps = await Despesa.buscaDespesaEmail(email);
      despesas = JSON.stringify( desp );

      if(!despesas) return res.render('404');
      res.render('despesa_lista', { despesas });
    }

  } catch(e) {
      console.log(e);
      return res.render('404');
  }
};




exports.register = async(req, res) => {
  try {
    const despesa = new Despesa(req.body);
    await despesa.register();

    if(despesa.errors.length > 0) {
      req.flash('errors', despesa.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    req.flash('success', 'Despesa registrada com sucesso!');
    req.session.save(() => res.redirect(`/despesa/despesa_lista`));
    return;

  } catch(e) {
    console.log(e);
    return res.render('404');
  }
};



exports.editIndex = async function(req, res) {
  if(!req.params.id) return res.render('404');

  const despesa = await Despesa.buscaPorId(req.params.id);
  if(!despesa) return res.render('404');

  res.render('despesa', { despesa });
};



exports.edit = async function(req, res) {
  try {
    if(!req.params.id) return res.render('404');
    const despesa = new Despesa(req.body);
    await despesa.edit(req.params.id);

    if(despesa.errors.length > 0) {
      req.flash('errors', despesa.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    req.flash('success', 'Despesa editado com sucesso.');
    req.session.save(() => res.redirect(`/despesa/despesa_lista/`));
    return;

  } catch(e) {
    console.log(e);
    res.render('404');
  }
};

exports.delete = async function(req, res) {
  if(!req.params.id) return res.render('404');

  const despesa = await Despesa.delete(req.params.id);
  if(!despesa) return res.render('404');

  req.flash('success', 'Despesa apagada com sucesso.');
  req.session.save(() => res.redirect('back'));
  return;
};
