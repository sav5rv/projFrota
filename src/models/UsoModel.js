const mongoose = require('mongoose');
const validator = require('validator');

const UsoSchema = new mongoose.Schema({
  email:           { type: String, required: true },
  placa:           { type: String, required: false, default: '' },
  hodometroInicio: { type: String, required: false, default: '' },
  dataInicio:      { type: String, required: false, default: '' },
  horaInicio:      { type: String, required: false, default: '' },
  rso:             { type: String, required: false, default: '' },
  hodometroFim:    { type: String, required: false, default: '' },
  dataFim:         { type: String, required: false, default: '' },
  horaFim:         { type: String, required: false, default: '' },
  criadoEm:        { type: Date, default: Date.now },
});

const UsoModel = mongoose.model('Uso', UsoSchema);

function Uso(body) {
  this.body = body;
  this.errors = [];
  this.uso = null;
}

Uso.prototype.register = async function() {
  this.valida();
  if(this.errors.length > 0) return;
  this.uso = await UsoModel.create(this.body);
};

Uso.prototype.valida = function() {
  this.cleanUp();

  // Validação
  // O e-mail precisa ser válido
  if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
  if(!this.body.placa) this.errors.push('Placa é um campo obrigatório.');
  if(!this.body.email) this.errors.push('E-Mail é um campo obrigatório.');
};

Uso.prototype.cleanUp = function() {
  for(const key in this.body) {
    if(typeof this.body[key] !== 'string') {
      this.body[key] = '';
    }
  }

  this.body = {
    email:           this.body.email,
    placa:           this.body.placa,
    hodometroInicio: this.body.hodometroInicio,
    dataInicio:      this.body.dataInicio,
    horaInicio:      this.body.horaInicio,
    rso:             this.body.rso,
    hodometroFim:    this.body.hodometroFim,
    dataFim:         this.body.dataFim,
    horaFim:         this.body.horaFim,
  };
};

Uso.prototype.edit = async function(id) {
  if(typeof id !== 'string') return;
  this.valida();
  if(this.errors.length > 0) return;
  this.uso = await UsoModel.findByIdAndUpdate(id, this.body, { new: false, default: '' });
};





// Métodos estáticos
Uso.buscaPorId = async function(id) {
  if(typeof id !== 'string') return;

  // const email = this.body.email;
console.log('LINHA 77 USO MODEL ' + id);
  // const query = { id, email };

  const uso = await UsoModel.findById(id);

  return uso;
};




Uso.buscaUsos = async function() {
  const usos = await UsoModel.find()
    .sort({ criadoEm: -1 });
  return usos;
};

Uso.delete = async function(id) {
  if(typeof id !== 'string') return;
  const uso = await UsoModel.findOneAndDelete({_id: id});
  return uso;
};


module.exports = Uso;
