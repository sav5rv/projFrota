require('dotenv').config();

const express  = require('express');
const cors     = require('cors');

const app      = express();
const port     = process.env.PORT || 3030;
const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTIONSTRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    app.emit('pronto');
  })
  .catch(e => console.log(e));

const session    = require('express-session');
const MongoStore = require('connect-mongo');
const flash      = require('connect-flash');
const routes     = require('./routes');
const path       = require('path');
// const helmet = require('helmet'); // helmet começou a causar problemas no localhost por conta da falta de SSL
const csrf       = require('csurf');

const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');

// app.use(helmet()); // helmet começou a causar problemas no localhost por conta da falta de SSL

// Enable CORS
app.use(cors());
// A habilitação do CORS é necessária para o nosso teste local pois tanto o frontend como o backend estarão rodando 
  // na mesma máquina, com o mesmo IP. Dessa forma, é necessário desabilitar essa segurança para testar a nossa aplicação.
  // No ambiente produtivo, se as aplicações precisassem ficar na mesma máquina (incomum) seria adicionado o IP da máquina
  // ao invés do * no header Access-Control-Allow-Origin.
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //mais recente em relação ao BodyParser

app.use(express.static(path.resolve(__dirname, 'public')));

// app.use(express.favicon('public/img/favicon.ico'));

const sessionOptions = session({
  secret: 'akasdfj0út23453456+54qt23qv  qwf qwer qwer qewr asdasdasda a6()',
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60,
    httpOnly: true
  }
});

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
// Nossos próprios middlewares
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);


app.on('pronto', () => {
  app.listen(port, () => {
    console.log(`Acessar http://localhost:${port}`);
    console.log(`Servidor executando na porta ${port}`);
    console.log('***');
    console.log('******');

  });
});
