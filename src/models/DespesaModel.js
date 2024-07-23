const mongoose = require('mongoose');
const validator = require('validator');


const DespesaSchema = new mongoose.Schema({
  email:       { type: String, required: true },
  placa:       { type: String, required: true },
  tipoDespesa: { type: String, required: false, default: '' },
  hodometro:   { type: Number, required: false, default:0 },
  data:        { type: Date, required: false},
  hora:        { type: String, required: false, default: '' },
  local:       { type: String, required: false, default: '' },
  unidade:     { type: String, required: false, default: '' },
  quantidade:  { type: Number, required: false, default:0 },
  valor:       { type: Number, required: false, default:0 },
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

/*   let x = this.body.valor; //pega o valor moeda
  console.log (x);
  x = x.slice(3); //retira o cifrão
  console.log (x);
  x = parseFloat(x.replace(',', '.')); //substitui a virgula por ponto (Mongo usa somente ponto)
  console.log(x);
  console.log(typeof x); // confirma se é number */

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
    valor:       parseFloat(this.body.valor.replace('R$', '').replace(/\./g, '').replace(',', '.')), //substitui a virgula por ponto (Mongo usa somente ponto)
    obs:         this.body.obs,
  };
};




Despesa.prototype.edit = async function(id) {
  if(typeof id !== 'string') return;
  this.valida();
  if(this.errors.length > 0) return;
  this.despesa = await DespesaModel.findByIdAndUpdate(id, this.body, { new: false, default: ''  });
};



Despesa.buscaPorId = async function(id) {
  if(typeof id !== 'string') return;
  const despesa = await DespesaModel.findById(id);
  return despesa;
};



Despesa.buscaGrafico1 = async function() {
  const despesas1 = await DespesaModel.aggregate([
    {
      $group: {
        _id: "$placa",     // Agrupa por "colunaAgrupar"
        count: { $sum: 1 } // Conta o número de documentos em cada grupo
      }
    }
  ])  
  return despesas1;
};



Despesa.buscaGrafico2 = async function() {
  const despesas2 = await DespesaModel.aggregate([
    {
      $group: {
        _id: "$tipoDespesa",     // Agrupa por "colunaAgrupar"
        count: { $sum: 1 } // Conta o número de documentos em cada grupo
      }
    }
  ])  
  return despesas2;
};



Despesa.buscaGrafico3 = async function() {
  const despesas3 = await DespesaModel.aggregate([
    { 
      $match: { placa: "ABC1456" }
    },
    {
      $group: {
        _id: "$tipoDespesa",     // Agrupa por "colunaAgrupar"
        count: { $sum: 1 } // Conta o número de documentos em cada grupo
      }
    }
  ])  
  return despesas3;
};



Despesa.buscaGrafico5 = async function() {
  const despesas5 = await DespesaModel.aggregate([
    {
      $match: { tipoDespesa: "Pneu" }  // Filtro pelo produto específico
    },
    {
      $group: {
        _id: {
          //data: { $dateToString: { format: "%Y-%m-%d", date: "$data" } }
          data: { $dateToString: { format: "%m-%Y", date: "$data" } }
        },
        totalValor: { $sum: "$valor" }
      }
    },
    {
      $sort: { "_id.data": 1 }
    }
  ]);    
  return despesas5;
};



Despesa.buscaDespesas = async function() {
  const despesas = await DespesaModel.find()
    .sort({ criadoEm: -1 });
  return despesas;
};



Despesa.buscaDespesaEmail = async function(email) {
  const despesas = await DespesaModel.find({ email: email })
    .sort({ criadoEm: -1 });
  return despesas;
};



Despesa.delete = async function(id) {
  if(typeof id !== 'string') return;
  const despesa = await DespesaModel.findOneAndDelete({_id: id});
  return despesa;
};




module.exports = Despesa;