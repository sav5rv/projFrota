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
  alteradoEm:  { type: Date, default: '' },
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





  // o alterar_senha está vindo do LOGINcontrolle
  async alterar_senha( email, password, re, senhaNova ) {
        
    if(this.login = await LoginModel.findOne({ email: email, re: re }, { })) {
      // console.log('LINHA 77 LOGIN MODEL ' + this.login);
      // console.log('LINHA 78 LOGIN MODEL ' + this.login.password);
      // console.log('LINHA 79 LOGIN MODEL ' + password);

      if(bcryptjs.compareSync(password, this.login.password)){
        const id = this.login.id;
                
        const salt = bcryptjs.genSaltSync();
        senhaNova = bcryptjs.hashSync(senhaNova, salt);

        // console.log('LINHA 81 LOGIN MODEL ' + senhaNova);
        // console.log('LINHA 82 LOGIN MODEL ' + id);

        this.login = await LoginModel.findByIdAndUpdate(id, {password: senhaNova}, { new: true });
        //if(this.login) this.sucess.push('Senha Alterada.');
        // console.log('LINHA 84 LOGIN MODEL ' + this.login);
        return this.login;

      } else {
        this.errors.push('Não foi localizado nenhum usuario com o conjunto de dados informado.');
        this.login = null;
        return this.login;
      }
    } else {
      this.errors.push('Não foi localizado nenhum usuario com o conjunto de dados informado.');
      return;
    };   
  };



  
  // o esqueci_senha está vindo do LOGINcontrolle
  async esqueci_senha( email, re, nome ) {        
    if(this.login = await LoginModel.findOne({ email: email, re: re, nome: nome }, { })) {
      console.log('LINHA 116 LOGIN MODEL ' + this.login);
      console.log('LINHA 117 LOGIN MODEL ' + this.login.email);

      return this.login;
    } else {
        this.errors.push(`Não foi localizado o usuario - ${email}`); //JS template string
        return;
    };   
  };


  async gerar_senha(email, re) {
    const max = re;
    const num = Math.floor(Math.random() * (max - 0 + 1)) + 0;
    let senhaNova = toString(num);
    console.log( `LINHA 133 LOGIN MODEL senha: ${num}`);

       
      if(this.login = await LoginModel.findOne({ email: email, re: re }, { })) {
        // console.log('LINHA 77 LOGIN MODEL ' + this.login);
        // console.log('LINHA 78 LOGIN MODEL ' + this.login.password);
        // console.log('LINHA 79 LOGIN MODEL ' + password);
  
        if(senhaNova){
          const id = this.login.id;
                  
          const salt  = bcryptjs.genSaltSync();
          senhaNova   = bcryptjs.hashSync(senhaNova, salt);
  
          console.log('LINHA 144 LOGIN MODEL ' + senhaNova);
          console.log('LINHA 145 LOGIN MODEL ' + id);
  
          this.login = await LoginModel.findByIdAndUpdate(id, {password: senhaNova}, { new: true });
          //if(this.login) this.sucess.push('Senha Alterada.');
          // console.log('LINHA 84 LOGIN MODEL ' + this.login);
          //if(this.login) this.success.push('Anote sua senha: ');
          return this.login.id;
  
        } else {
          this.errors.push('Não foi localizado nenhum usuario com o conjunto de dados informado.');
          this.login = null;
          return this.login;
        }
      } else {
        this.errors.push('Não foi localizado nenhum usuario com o conjunto de dados informado.');
        return;
      };   

  };
  
  

  

  valida() {
    this.cleanUp();

    // Validação
    // O e-mail precisa ser válido
    if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');

    // A senha precisa ter entre 3 e 16
    if(this.body.password.length < 3 || this.body.password.length > 16) {
      this.errors.push('A senha precisa ter entre 3 e 16 caracteres.');
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
    this.login = await LoginModel.find({ }, { _id:0, email:1, nome:2, re:3, tipoUsuario:4, criadoEm:5, alteradoEm:6 } )
    // this.login = await LoginModel.find({ }, { _id:0, email:1, password:2, nome:3, re:4, tipoUsuario:5 } )
    .sort({ nome: -1 });
    // na classe temos que colocar oq será retornado
    return this.login
  };


  
  
  async edit(email) {
    
    console.log('LINHA 160 LOGIN MODEL ' + this.body.re);

    if(typeof email !== 'string') return;
    this.cleanUp();
    if(this.errors.length > 0) return;
    this.login = await LoginModel.findOneAndUpdate({ email : email }, { nome : this.body.nome, re : this.body.re, tipoUsuario : this.body.tipoUsuario }, { new: true });
  };




  // o buscar_o_email está vindo do USOcontrolle
  async buscaEmail(buscar_o_email) { 
    this.login = await LoginModel.findOne({ email: buscar_o_email }, { _id:0, email:1, nome:2, re:3, tipoUsuario:4 });
    console.log('LINHA 164 LOGIN MODEL ' + buscar_o_email + '/n');
    
    return this.login
  };


}

module.exports = Login;
