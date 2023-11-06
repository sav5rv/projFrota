const mongoose = require('mongoose');
const validator = require('validator');

const DespesaSchema = new mongoose.Schema({
  email:       { type: String, required: true },
  placa:       { type: String, required: true },
  tipoDespesa: { type: String, required: false, default: '' },
  hodometro:   { type: String, required: false, default: '' },
  data:        { type: String, required: false, default: '' },
  hora:        { type: String, required: false, default: '' },
  local:       { type: String, required: false, default: '' },
  unidade:     { type: String, required: false, default: '' },
  quantidade:  { type: String, required: false, default: '' },
  valor:       { type: String, required: false, default: '' },
  obs:         { type: String, required: false, default: '' },
  criadoEm:    { type: Date, default: Date.now },
});

const DespesaModel = mongoose.model('Despesa', DespesaSchema);

function Despesa(body) {
  this.body = body;
  this.errors = [];
  this.despesa = null;
}

Despesa.prototype.register = async function() {
  this.valida();
  if(this.errors.length > 0) return;
  this.despesa = await DespesaModel.create(this.body);
};

Despesa.prototype.valida = function() {
  this.cleanUp();

  // Validação
  // O e-mail precisa ser válido
  if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
  if(!this.body.placa) this.errors.push('Placa é um campo obrigatório');
  if(!this.body.tipoDespesa) this.errors.push('Tipo de Despesa é um campo obrigatório.');
  
};

Despesa.prototype.cleanUp = function() {
  for(const key in this.body) {
    if(typeof this.body[key] !== 'string') {
      this.body[key] = '';
    }
  }

  this.body = {
    email:       this.body.email,
    placa:       this.body.placa,    
    tipoDespesa: this.body.tipoDespesa,
    hodometro:   this.body.hodometro,
    data:        this.body.data,
    hora:        this.body.hora,
    local:       this.body.local,
    unidade:     this.body.unidade,
    quantidade:  this.body.quantidade,
    valor:       this.body.valor,
    obs:         this.body.obs,
  };
};

Despesa.prototype.edit = async function(id) {
  if(typeof id !== 'string') return;
  this.valida();
  if(this.errors.length > 0) return;
  this.despesa = await DespesaModel.findByIdAndUpdate(id, this.body, { new: false, default: ''  });
};

// Métodos estáticos
Despesa.buscaPorId = async function(id) {
  if(typeof id !== 'string') return;
  const despesa = await DespesaModel.findById(id);
  return despesa;
};

Despesa.buscaDespesas = async function() {
  const despesas = await DespesaModel.find()
    .sort({ criadoEm: -1 });
  return despesas;
};

Despesa.delete = async function(id) {
  if(typeof id !== 'string') return;
  const despesa = await DespesaModel.findOneAndDelete({_id: id});
  return despesa;
};


module.exports = Despesa;
