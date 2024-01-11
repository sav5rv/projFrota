const Veiculo = require('../models/VeiculoModel');
const Contato = require('../models/ContatoModel');

exports.index = (req, res) => {
  res.render('./teste01/index');
  };


  exports.placa = (req, res) => {
    res.render('./teste01/lista_placa');
    };



exports.veiculo_lista = async(req, res) => {
  const veiculos = await Veiculo.buscaVeiculos();

  try {
    if(!veiculos) return res.render('404');
    const x = JSON.stringify( veiculos );
    //const y = JSON.stringify( x );
    // console.log ( veiculos );
    // console.log ( x );
    
    res.render('./teste01/dtTable', { x } ); //como a chave é veiculos e a variavel que esta vindo é veiculos tb não preciso fazer { veiculos:veiculos }
    //res.render('./teste01/dtTable', { veiculos } );
    //res.render('./teste01/dtTable', { y } );
    
    //res.send({ veiculos });
    //res.send(x);
    //res.json(veiculos);
  } catch(e) {
      console.log(e);
      return res.render('404');
  }
};


exports.index2 = (req, res) => {
  res.render('./teste01/index2.html');
  };

  exports.modeloForm = (req, res) => {
    res.render('modeloForm');
    };  


// exports.index2 = async(req, res) => {
//   const contatos = await Contato.buscaContatos();

//   try {
//     if(!contatos) return res.render('404');
//     res.render('./teste01/index2', { contatos }); //como a chave chama contatos e a variavel que esta vindo é contatos tambem
//                                                //não preciso fazer { contatos:contatos }
//   } catch(e) {
//       console.log(e);
//       return res.render('404');
//   }
// };


/* exports.veiculo_lista = async( req, res) => {
  const veiculos = await Veiculo.buscaVeiculos();

  try {
    if(!veiculos) return res.render('404');
    const dadosVeiculos = JSON.stringify(veiculos);
    console.log( 'LINHA 31 TESTE01 CONTROLLER ' + dadosVeiculos );
    res.render('./teste01/dtTable', { dadosVeiculos });

  }

  catch(e){
    console.log(e);
    return res.render('404');
  }
}; */
