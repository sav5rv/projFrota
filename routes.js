const express = require('express');
const route = express.Router();


const homeController =    require('./src/controllers/homeController');
const loginController =   require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');
const veiculoController = require('./src/controllers/veiculoController');
const despesaController = require('./src/controllers/despesaController');
const usoController =     require('./src/controllers/usoController');
const rodapeController =  require('./src/controllers/rodapeController');
const teste01Controller =  require('./src/controllers/teste01Controller');


const { loginRequired, loginRequiredADM } = require('./src/middlewares/middleware');



// Rotas da home
route.get('/', homeController.index);



// Rotas para o menu TESTE
route.get('/teste01/index',             teste01Controller.index);
//route.get('/teste01/criar',           teste01Controller.criar);
//route.post('/teste01/register',       teste01Controller.register);
route.get('/teste01/dtTable',           teste01Controller.veiculo_lista);
route.get('/teste01/placa',             teste01Controller.placa);
route.get('/teste01/modeloForm1',                teste01Controller.modeloForm1);
route.get('/teste01/index2.ejs',       teste01Controller.index2);
route.get('/index3.html');
route.get('/index4.html');



// Rotas de login
route.get('/login/index',             loginController.index);
route.get('/login/criar',             loginController.criar); //chama a tela
route.post('/login/register',         loginController.register); // ENVIAR e salva as informações no bc
route.post('/login/login',            loginController.login);
route.get('/login/alterar',           loginController.alterar); // formulario esqueci senha ou alterar senha
route.post('/login/alterar_senha',     loginController.alterar_senha); //ENVIAR inf para alterar o BD
route.get('/login/logado',            loginController.logado);
route.get('/login/logout',            loginController.logout);

//Fetch usado em veiculo_cad
route.get('/login/lista_email_login', loginController.lista_email_login); //Fetch usado em Contato_Cad



// Rotas de usuários (contato)

route.get('/contato/index',             loginRequiredADM, contatoController.index); //inserir
route.post('/contato/register',         loginRequiredADM, contatoController.register); //adicionar novo
route.get('/contato/delete/:id',        loginRequiredADM, contatoController.delete); //deletar
route.get('/contato/contato_lista',     loginRequiredADM, contatoController.contato_lista); //1º listei
route.get('/contato/contato_lista/:id', loginRequiredADM, contatoController.editIndex); //2º cliquei para editar e abri o form de edição
route.post('/contato/edit/:id',         loginRequiredADM, contatoController.edit); //3º salvei o form alterado
route.get('/contato/lista_contato',     loginRequiredADM, contatoController.lista_contato);



// Rotas de veiculo
route.get('/veiculo/veiculo_cad',              loginRequiredADM, veiculoController.index);
route.post('/veiculo/register',                loginRequiredADM, veiculoController.register);
route.get('/veiculo/delete/:id',               loginRequiredADM, veiculoController.delete);
route.get('/veiculo/veiculo_lista',            loginRequiredADM, veiculoController.veiculo_lista);
route.get('/veiculo/veiculo_lista/:id',        loginRequiredADM, veiculoController.editIndex); //usado no retorno do cad veiculo
route.post('/veiculo/edit/:id',                loginRequiredADM, veiculoController.edit);
route.get('/veiculo/lista_veiculo',            loginRequiredADM, veiculoController.lista_veiculo);

//Fetch usado em veiculo_cad
route.get('/veiculo/teste_lista_veiculo/:rodas',      veiculoController.teste_lista_veiculo);
// route.get('/veiculo/cbo_veiculo',                  veiculoController.lista_placa);
route.get('/veiculo/lista_placa',                     veiculoController.lista_placa);



// Rotas de despesa
route.get('/despesa/index',             loginRequired, despesaController.index);
route.post('/despesa/register',         loginRequired, despesaController.register);
route.get('/despesa/delete/:id',        loginRequired, despesaController.delete);
route.get('/despesa/despesa_lista',     loginRequired, despesaController.despesa_lista);
route.get('/despesa/despesa_lista/:id', loginRequired, despesaController.editIndex);
route.post('/despesa/edit/:id',         loginRequired, despesaController.edit);





// Rotas de uso - utilização
route.get('/uso/uso_abrir',             loginRequired, usoController.uso_abrir); //Abrir
route.get('/uso/uso_finalizar/:id',     loginRequired, usoController.uso_finalizar); //Finalizar
route.post('/uso/register',             loginRequired, usoController.register);
route.get('/uso/delete/:id',            loginRequired, usoController.delete);
route.get('/uso/uso_lista',             loginRequired, usoController.uso_lista); //Listar
route.get('/uso/index_uso/:id',         loginRequired, usoController.editIndex);
route.post('/uso/edit/:id',             loginRequired, usoController.edit);


// Rotas rodapé
route.get('/faleConosco', rodapeController.faleConosco);
route.get('/credito',     rodapeController.credito);
route.get('/mapaSite',    rodapeController.mapaSite);
route.get('/sobre',       rodapeController.sobre);


module.exports = route;
