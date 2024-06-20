const Veiculo = require('../models/VeiculoModel');
const Contato = require('../models/ContatoModel');
const Despesa = require('../models/DespesaModel');

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


exports.despesa_lista = async(req, res) => {
  const despesa = await Despesa.buscaDespesas();

  try {
    if(!despesa) return res.render('404');
    const x = JSON.stringify( despesa );
    //const y = JSON.stringify( x );
    // console.log ( veiculos );
    // console.log ( x );
    
    res.render('./teste01/despesa_lista', { x } ); //como a chave é veiculos e a variavel que esta vindo é veiculos tb não preciso fazer { veiculos:veiculos }

  } catch(e) {
      console.log(e);
      return res.render('404');
  }
};


exports.index2 = (req, res) => {
  //res.render('./teste01/index2.html');

// // Recupera o objeto `Request`.
// const request = req;

// // Recupera o cabeçalho `X-Forwarded-For`.
// const headers = request.headers;

// // Recupera o endereço IP do cliente original da solicitação.
// const ip = headers["X-Forwarded-For"];

// // Divide o valor do cabeçalho em um array de strings.
// const ips = ip.split(",");

// // Recupera o índice 0 do array para obter o endereço IP do cliente original da solicitação.
// const ipOriginal = ips[0];

// // Recupera o nome do usuário da máquina com o endereço IP especificado.
// const nomeUsuario = window.getRemoteUser(ipOriginal);

// // Imprime o nome do usuário no console.
// console.log(nomeUsuario);

// // Retorna uma resposta vazia.
// res.send();


// // Recupera o objeto `Request`.
// const request = req;

// // Recupera o objeto `User`.
// const user = window.User;

// // Recupera o nome do usuário.
// const nomeUsuario = user.name;

// // Imprime o nome do usuário no console.
// console.log(nomeUsuario);

// // Retorna uma resposta vazia.
// res.send();

};




exports.modeloForm1 = (req, res) => {
    res.render('./teste01/modeloForm-1');
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
