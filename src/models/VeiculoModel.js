const mongoose = require('mongoose');
const validator = require('validator');

const VeiculoSchema = new mongoose.Schema({
  placa:       { type: String, required: true },
  renavan:     { type: String, required: false, default: '' },
  chassi:      { type: String, required: false, default: '' },
  prefixo:     { type: String, required: false, default: '' },  
  hodometro:   { type: String, required: false, default: '' },  
  combustivel: { type: String, required: false, default: '' },
  rodas:       { type: String, required: false, default: '' },
  cor:         { type: String, required: false, default: '' },
  criadoEm:    { type: Date, default: Date.now },
});


const VeiculoModel = mongoose.model('Veiculo', VeiculoSchema);

function Veiculo(body) {
  this.body = body;
  this.errors = [];
  this.veiculo = null;
}

Veiculo.prototype.register = async function() {
  this.valida();
  if(this.errors.length > 0) return;
  this.veiculo = await VeiculoModel.create(this.body);
};

Veiculo.prototype.valida = function() {
  this.cleanUp();

  // Validação
  if(!this.body.placa) this.errors.push('Placa é um campo obrigatório.');
};

Veiculo.prototype.cleanUp = function() {
  for(const key in this.body) {
    if(typeof this.body[key] !== 'string') {
      this.body[key] = '';
    }
  }

  this.body = {
    placa:       this.body.placa,
    renavan:     this.body.renavan,
    chassi:      this.body.chassi,
    prefixo:     this.body.prefixo,
    hodometro:   this.body.hodometro,
    combustivel: this.body.combustivel,
    rodas:       this.body.rodas,
    cor:         this.body.cor,

  };
};

Veiculo.prototype.edit = async function(id) {
  if(typeof id !== 'string') return;
  this.valida();
  if(this.errors.length > 0) return;
  this.veiculo = await VeiculoModel.findByIdAndUpdate(id, this.body, { new: true });
};

// Métodos estáticos
Veiculo.buscaPorId = async function(id) {
  if(typeof id !== 'string') return;
  const veiculo = await VeiculoModel.findById(id);
  return veiculo;
};

Veiculo.buscaPorRodas = async function(rodas) {
  // if(typeof rodas !== 'string') return;
  const veiculo = await VeiculoModel.find( { rodas: rodas }, { renavan:1, rodas:1 } );
  return veiculo;
};

Veiculo.buscaVeiculos = async function() {
  const veiculos = await VeiculoModel.find()
    .sort({ criadoEm: -1 });
  return veiculos;
};

Veiculo.delete = async function(id) {
  if(typeof id !== 'string') return;
  const veiculo = await VeiculoModel.findOneAndDelete({_id: id});
  return veiculo;
};


module.exports = Veiculo;
