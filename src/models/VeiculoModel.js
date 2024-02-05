const mongoose = require('mongoose');

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
  this.body = body; //body é o obj JavaScript que esta vindo do cabeçalho da página e está sendo armazenado em um novo obj que é o this.body
  this.errors = [];
  this.veiculo = null;
}


Veiculo.prototype.register = async function() {
  await this.valida();
  await this.placaExists();
  await this.renavanExists();

  if(this.errors.length > 0) return;

  this.veiculo = await VeiculoModel.create(this.body);  
};


Veiculo.prototype.valida = function() {
  this.cleanUp();
  if(!this.body.placa) this.errors.push('Placa é um campo obrigatório.');

};

Veiculo.prototype.renavanExists = async function() {
  this.renavan = await VeiculoModel.findOne({ renavan: this.body.renavan });
  if(this.renavan) this.errors.push('Renavan já cadastrado.');
};


Veiculo.prototype.placaExists = async function() {
  this.placa = await VeiculoModel.findOne({ placa: this.body.placa });
  if(this.placa) this.errors.push('Placa já cadastrada.');
};


Veiculo.prototype.cleanUp = function() {
    for(const key in this.body) {
      if(typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }; 
    

    this.body = {
      placa:       this.body.placa.toUpperCase().replace(' ', ''),
      renavan:     this.body.renavan,
      chassi:      this.body.chassi.toUpperCase(),
      prefixo:     this.body.prefixo.toUpperCase().replace(' ', ''),
      hodometro:   this.body.hodometro,
      combustivel: this.body.combustivel,  //qd uso toUpperCase nessa linha o select não está retornando valor na função carregar placa
      rodas:       this.body.rodas,
      cor:         this.body.cor.toUpperCase().replace(' ', ''),

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


// usado para testar o Fetch em teste01/lista_placa
Veiculo.lista_placa = async function() {
  const veiculo = await VeiculoModel.find({ }, { _id:0 } ) //Pesquisa que oculta o campo _id
    .sort({ placa: 1 });  
  return veiculo;
};



Veiculo.buscaVeiculos = async function() {
  const veiculos = await VeiculoModel.find( )
    .sort({ criadoEm: -1 });
  return veiculos;
};


Veiculo.delete = async function(id) {
  if(typeof id !== 'string') return;
  const veiculo = await VeiculoModel.findOneAndDelete({_id: id});
  return veiculo;
};


module.exports = Veiculo;