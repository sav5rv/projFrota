const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
  nome:        { type: String, required: true },
  email:       { type: String, required: true },
  celular:     { type: String, required: false, default: '' },
  re:          { type: String, required: false, default: '' },  
  tipoUsuario: { type: String, required: false, default: '' },
  cnhRegistro: { type: String, required: false, default: '' },
  categoria:   { type: String, required: false, default: '' },
  validade:    { type: String, required: false, default: '' },
  obs:         { type: String, required: false, default: '' },
  criadoEm:    { type: Date, default: Date.now }
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body) {
  this.body = body;
  this.errors = [];
  this.contato = null;
}



Contato.prototype.register = async function() {
  this.valida();
    if(this.errors.length > 0) return;

  this.loginExists();
    // if(this.errrors.length > 0) return;

  this.contato = await ContatoModel.create(this.body);
}


Contato.prototype.loginExists = async function() {
  this.contato = ContatoModel.findOne({ email: this.body.email });
  if(this.contato) this.errors.push('Usuário já cadastrado com esse email.');
}


Contato.prototype.valida = function() {
  this.cleanUp();

  // Validação
  if(!this.body.nome) this.errors.push('Nome é um campo obrigatório.');
  // O e-mail precisa ser válido
  if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');

  if(!this.body.nome && !this.body.email) {
    this.errors.push('Campos Nome e EMail são obrigatórios');
  }
}



Contato.prototype.cleanUp = function() {
  for(const key in this.body) {
    if(typeof this.body[key] !== 'string') {
      this.body[key] = '';
    }
  }

  this.body = {
    nome:        this.body.nome,
    email:       this.body.email,
    celular:     this.body.celular,
    re:          this.body.re,
    tipoUsuario: this.body.tipoUsuario,
    cnhRegistro: this.body.cnhRegistro,
    categoria:   this.body.categoria,
    validade:    this.body.validade,
    obs:         this.body.obs,
  };
};



Contato.prototype.edit = async function(id) {
  if(typeof id !== 'string') return;
  this.valida();
  if(this.errors.length > 0) return;
  this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
};


// Métodos estáticos
Contato.buscaPorId = async function(id) {
  if(typeof id !== 'string') return;
  const contato = await ContatoModel.findById(id);
  return contato;
};

Contato.buscaContatos = async function() {
  const contatos = await ContatoModel.find();

  return contatos;
};

Contato.delete = async function(id) {
  if(typeof id !== 'string') return;
  const contato = await ContatoModel.findOneAndDelete({_id: id});
  return contato;
};


module.exports = Contato;
