const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
  email:       { type: String, required: true },
  password:    { type: String, required: true },
  nome:        { type: String, required: false, default: ''},
  re:          { type: String, required: false, default: ''},
  tipoUsuario: { type: String, required: true },
  criadoEm:    { type: Date, default: Date.now },
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.login = null;
  }

  async log() {
    this.valida();
    if(this.errors.length > 0) return;
    this.login = await LoginModel.findOne({ email: this.body.email });

    if(!this.login) {
      this.errors.push('Usuário não existe.');
      return;
    }

    if(!bcryptjs.compareSync(this.body.password, this.login.password)) {
      this.errors.push('Senha inválida');
      this.login = null;
      return;
    }
  }

  
  async register() {
    this.valida();
      if(this.errors.length > 0) return;

    await this.loginExists();
      if(this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
      this.body.password = bcryptjs.hashSync(this.body.password, salt);

    this.login = await LoginModel.create(this.body);
  }

  

  async loginExists() {
    this.login = await LoginModel.findOne({ email: this.body.email });
    if(this.login) this.errors.push('Usuário já cadastrado com esse email.');
  }



  valida() {
    this.cleanUp();

    // Validação
    // O e-mail precisa ser válido
    if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');

    // A senha precisa ter entre 3 e 50
    if(this.body.password.length < 3 || this.body.password.length > 50) {
      this.errors.push('A senha precisa ter entre 8 e 16 caracteres.');
    }
  }


  cleanUp() {
    for(const key in this.body) {
      if(typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }


    this.body = {
      email:       this.body.email,
      password:    this.body.password,
      nome:        this.body.nome,
      re:          this.body.re,
      tipoUsuario: this.body.tipoUsuario
    };
  }


  // sendo chamada em homeController para contar a qtd de registro para a pág index
  // sendo chamado em contato_cad para a função Fetch Lista_Email_Login
  async buscaLogins() {
    this.login = await LoginModel.find({ }, { _id:0, email:1, nome:2, re:3, tipoUsuario:4 } )
      .sort({ nome: -1 });
      //console.log('LINHA 99 LOGIN MODEL ' + this.login);
      // na classe temos que colocar oq será retornado
    return this.login
  };


  // o buscar_o_email está vindo do USOcontrolle
  async buscaEmail(buscar_o_email) { 
    this.login = await LoginModel.findOne({ email: buscar_o_email }, { _id:0, email:1, nome:2, re:3, tipoUsuario:4 });
    console.log('LINHA 108 LOGIN MODEL ' + buscar_o_email);
    
    return this.login
  };


}

module.exports = Login;
