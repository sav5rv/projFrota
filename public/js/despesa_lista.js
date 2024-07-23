//import { formataData } from './js/geral.js';
// import moment from 'moment';

// pegando as inf passados do Bc ao Html e do Html ao JS
const despesa = dadosBc;

  
  function criarTabelaDespesas() {
    const tabela = document.createElement('table');
    tabela.classList.add('table', 'table-striped');
  
    const thead = document.createElement('thead');
    const trCabecalho = document.createElement('tr');
  
    // Criar e adicionar células de cabeçalho
    const thEmail = document.createElement('th');
    thEmail.textContent = 'EMail';
    trCabecalho.appendChild(thEmail);

    const thPlaca = document.createElement('th');
    thPlaca.textContent = 'Placa';
    trCabecalho.appendChild(thPlaca);

    const thTipo = document.createElement('th');
    thTipo.textContent = 'Tipo';
    trCabecalho.appendChild(thTipo);

    const thHodometro = document.createElement('th');
    thHodometro.textContent = 'Hodometro';
    trCabecalho.appendChild(thHodometro);

    const thData = document.createElement('th');
    thData.textContent = 'Data';
    trCabecalho.appendChild(thData);

    const thHora = document.createElement('th');
    thHora.textContent = 'Hora';
    trCabecalho.appendChild(thHora);

    const thLocal = document.createElement('th');
    thLocal.textContent = 'Local';
    trCabecalho.appendChild(thLocal);

    const thUnid = document.createElement('th');
    thUnid.textContent = 'Unidade';
    trCabecalho.appendChild(thUnid);

    const thQuant = document.createElement('th');
    thQuant.textContent = 'Quant';
    trCabecalho.appendChild(thQuant);

    const thValor = document.createElement('th');
    thValor.textContent = 'Valor';
    trCabecalho.appendChild(thValor);

    const thObs = document.createElement('th');
    thObs.textContent = 'Observações';
    trCabecalho.appendChild(thObs);

    const thEditar = document.createElement('th');
    thEditar.textContent = 'Editar';
    trCabecalho.appendChild(thEditar);

    const thExcluir = document.createElement('th');
    thExcluir.textContent = 'Excluir';
    trCabecalho.appendChild(thExcluir);
  
    // ... (repetir para as demais colunas)
  
    thead.appendChild(trCabecalho);
    tabela.appendChild(thead);
  
    const tbody = document.createElement('tbody');
    tabela.appendChild(tbody);
  
    return tabela;
  }
  
  function popularTabela(despesa, tabela) {
    const tbody = tabela.querySelector('tbody');
  
    despesa.forEach(despesa => {
      const tr = document.createElement('tr');
  
      const tdEmail = document.createElement('td');
      tdEmail.textContent = despesa.email;
      tr.appendChild(tdEmail);

      const tdPlaca = document.createElement('td');
      tdPlaca.textContent = despesa.placa;
      tr.appendChild(tdPlaca);
  
      const tdTipo = document.createElement('td');
      tdTipo.textContent = despesa.tipoDespesa;
      tr.appendChild(tdTipo);
  
      const tdHodometro = document.createElement('td');
      tdHodometro.textContent = completarComZeroHod(despesa.hodometro);
      tr.appendChild(tdHodometro);
  
      const tdData = document.createElement('td');
      tdData.textContent = formataData(despesa.data);
      tr.appendChild(tdData);
  
      const tdHora = document.createElement('td');
      tdHora.textContent = despesa.hora;
      tr.appendChild(tdHora);
  
      const tdLocal = document.createElement('td');
      tdLocal.textContent = despesa.local;
      tr.appendChild(tdLocal);
  
      const tdUnid = document.createElement('td');
      tdUnid.textContent = despesa.unidade;
      tr.appendChild(tdUnid);
  
      const tdQuant = document.createElement('td');
      tdQuant.textContent = despesa.quantidade;
      tr.appendChild(tdQuant);
  
      const tdValor = document.createElement('td');
      tdValor.textContent = formatarMoedaBR(despesa.valor);
      tr.appendChild(tdValor);
  
      const tdObs = document.createElement('td');
      tdObs.textContent = despesa.obs;
      tr.appendChild(tdObs);
  
      const tdEditar = document.createElement('td');
      const linkEditar = document.createElement('a');
      linkEditar.href = `/despesa/despesa_lista/${despesa._id}`;
      linkEditar.textContent = 'Editar';
      tdEditar.appendChild(linkEditar);
      tr.appendChild(tdEditar);
  
      const tdExcluir = document.createElement('td');
      const linkExcluir = document.createElement('a');
      linkExcluir.href = `/despesa/delete/${despesa._id}`;
      linkExcluir.classList.add('text-danger');
      linkExcluir.textContent = 'Excluir';
      tdExcluir.appendChild(linkExcluir);
      tr.appendChild(tdExcluir);
  
      // ... (repetir para as demais colunas)
  
      tbody.appendChild(tr);
    });
  }
  
    function formataData(dt) {
        if(despesa) {
            moment.locale('pt-BR');      
            //console.log(dt);
            //console.log(despesa);
            const dataF = new Date(dt); //primeiro converter o valor padrao ISODate que está vindo do Bc em um OBJ
            //console.log(dataF);
            const dataM = moment(dataF); //primeiro converter o OBJ data em momentJS
            //console.log(dataM);
            const dataFormatada = dataM.format('DD-MM-yyyy'); //agora formatar
            //console.log(dataFormatada);
                            
            return dataFormatada;
        }
    }

    function completarComZeroHod(hodometro) {
        if(hodometro) {
            const numHodometro = hodometro.toString();
            return numHodometro.padStart(6, "0");
        } else {
            return 'erro';
        }
    };

    function formatarMoedaBR(x) {
        let valor = x;
    // Verifica se o valor é um número
    // if (isNaN(valor)) {
    //     return "";
    //   }
    
      // Converte o valor para string
      valor = valor.toString();
    
      // Remove caracteres indesejados
      valor = valor.replace(/[^0-9,.-]/g, "");
    
      // Separa a parte inteira da parte decimal
      const partes = valor.split(".");
    
      // Formata a parte inteira com máscara de milhar (opcional)
      const parteInteiraFormatada = partes[0].replace(/\B(?=(\d{3})+$)/g, ".");
    
      // Formata a parte decimal (se existir)
      let parteDecimalFormatada = "";
      if (partes.length > 1) {
        parteDecimalFormatada = "," + partes[1].substring(0, 2); // Limita a parte decimal para 2 casas
    } else {
        // Adiciona vírgula e dois zeros se não houver parte decimal
        parteDecimalFormatada = ",00";
    } 
    
      // Retorna o valor formatado como moeda
      return `R$ ${parteInteiraFormatada}${parteDecimalFormatada}`;
    
      };
    
    

  const tabelaDespesas = criarTabelaDespesas();
  popularTabela(despesa, tabelaDespesas);
  //document.body.appendChild(tabelaDespesas);
  const containerElem = document.getElementById('tbContainer');
  containerElem.appendChild(tabelaDespesas);
  