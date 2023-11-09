const express = require('express');
const route = express.Router();


const homeController =    require('./src/controllers/homeController');
const loginController =   require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');
const veiculoController = require('./src/controllers/veiculoController');
const despesaController = require('./src/controllers/despesaController');
const usoController =     require('./src/controllers/usoController');
const rodapeController =  require('./src/controllers/rodapeController');


const { loginRequired, loginRequiredADM } = require('./src/middlewares/middleware');



// Rotas da home
route.get('/', homeController.index);



// Rotas de login
route.get('/login/index',     loginController.index);
route.get('/login/criar',     loginController.criar);
route.post('/login/register', loginController.register);
route.post('/login/login',    loginController.login);
route.get('/login/logout',    loginController.logout);



// Rotas de usuários (contato)

route.get('/contato/index',             loginRequiredADM, contatoController.index); //inserir
route.post('/contato/register',         loginRequiredADM, contatoController.register); //adicionar novo
route.get('/contato/delete/:id',        loginRequiredADM, contatoController.delete); //deletar
route.get('/contato/index_contato',     loginRequiredADM, contatoController.index_contato); //1º listei
route.get('/contato/index_contato/:id', loginRequiredADM, contatoController.editIndex); //2º cliquei para editar e abri o form de edição
route.post('/contato/edit/:id',         loginRequiredADM, contatoController.edit); //3º salvei o form alterado



// Rotas de veiculo

route.get('/veiculo/index',              loginRequiredADM, veiculoController.index);
route.post('/veiculo/register',          loginRequiredADM, veiculoController.register);
route.get('/veiculo/delete/:id',         loginRequiredADM, veiculoController.delete);
route.get('/veiculo/index_veiculo',      loginRequiredADM, veiculoController.index_veiculo);
route.get('/veiculo/index_veiculo/:id',  loginRequiredADM, veiculoController.editIndex);
route.post('/veiculo/edit/:id',          loginRequiredADM, veiculoController.edit);




// Rotas de despesa
route.get('/despesa/index',             loginRequired, despesaController.index);
route.post('/despesa/register',         loginRequired, despesaController.register);
route.get('/despesa/delete/:id',        loginRequired, despesaController.delete);
route.get('/despesa/index_despesa',     loginRequired, despesaController.index_despesa);
route.get('/despesa/index_despesa/:id', loginRequired, despesaController.editIndex);
route.post('/despesa/edit/:id',         loginRequired, despesaController.edit);





// Rotas de uso - utilização
route.get('/uso/index',         loginRequired, usoController.index);
route.post('/uso/register',     loginRequired, usoController.register);
route.get('/uso/delete/:id',    loginRequired, usoController.delete);
route.get('/uso/index_uso',     loginRequired, usoController.index_uso);
route.get('/uso/index_uso/:id', loginRequired, usoController.editIndex);
route.post('/uso/edit/:id',     loginRequired, usoController.edit);


// Rotas rodapé
route.get('/faleConosco', rodapeController.index_faleConosco);
route.get('/credito',     rodapeController.index_credito);
route.get('/mapaSite',    rodapeController.index_mapaSite);
route.get('/sobre',       rodapeController.index_sobre);


module.exports = route;
