// pegando as inf passados do Bc ao Html e do Html ao JS
const uso = dadosBc;

  
  function criarTabelaUsos() {
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

    const thKmInicio = document.createElement('th');
    thKmInicio.textContent = 'KM Inicio';
    trCabecalho.appendChild(thKmInicio);

    const thDataInicio = document.createElement('th');
    thDataInicio.textContent = 'Data Inicio';
    trCabecalho.appendChild(thDataInicio);

    const thHoraInicio = document.createElement('th');
    thHoraInicio.textContent = 'Hora Inicio';
    trCabecalho.appendChild(thHoraInicio);

    const thRsoNum = document.createElement('th');
    thRsoNum.textContent = 'Rso Núm';
    trCabecalho.appendChild(thRsoNum);

    const thKmFim = document.createElement('th');
    thKmFim.textContent = 'KM Final';
    trCabecalho.appendChild(thKmFim);

    const thDataFim = document.createElement('th');
    thDataFim.textContent = 'Data Final';
    trCabecalho.appendChild(thDataFim);

    const thHoraFim = document.createElement('th');
    thHoraFim.textContent = 'Hora Final';
    trCabecalho.appendChild(thHoraFim);

    const thFinalizar = document.createElement('th');
    thFinalizar.textContent = 'Finalizar';
    trCabecalho.appendChild(thFinalizar);    

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
  
  function popularTabela(uso, tabela) {
    const tbody = tabela.querySelector('tbody');
  
    uso.forEach(uso => {
      const tr = document.createElement('tr');
  
      const tdEmail = document.createElement('td');
      tdEmail.textContent = uso.email;
      tr.appendChild(tdEmail);

      const tdPlaca = document.createElement('td');
      tdPlaca.textContent = uso.placa;
      tr.appendChild(tdPlaca);
  
      const tdHodometroInicio = document.createElement('td');
      tdHodometroInicio.textContent = completarComZeroHod(uso.hodometroInicio);
      tr.appendChild(tdHodometroInicio);
  
      const tdDataInicio = document.createElement('td');
      tdDataInicio.textContent = formataData(uso.dataInicio);
      tr.appendChild(tdDataInicio);
  
      const tdHoraInicio = document.createElement('td');
      tdHoraInicio.textContent = uso.horaInicio;
      tr.appendChild(tdHoraInicio);
  
      const tdRso = document.createElement('td');
      tdRso.textContent = completarComZeroRso(uso.rso);
      tr.appendChild(tdRso);

      const tdHodometroFinal = document.createElement('td');
      tdHodometroFinal.textContent = completarComZeroHod(uso.hodometroFim);
      tr.appendChild(tdHodometroFinal);
  
      const tdDataFinal = document.createElement('td');
      tdDataFinal.textContent = formataData(uso.dataFim);
      tr.appendChild(tdDataFinal);
  
      const tdHoraFinal = document.createElement('td');
      tdHoraFinal.textContent = uso.horaFim;
      tr.appendChild(tdHoraFinal); 

      const tdFinalizar = document.createElement('td');
      const linkFinalizar = document.createElement('a');
      linkFinalizar.href = `/uso/uso_finalizar/${uso._id}`;
      linkFinalizar.textContent = 'Finalizar';
      tdFinalizar.appendChild(linkFinalizar);
      tr.appendChild(tdFinalizar);

      const tdEditar = document.createElement('td');
      const linkEditar = document.createElement('a');
      linkEditar.href = `/uso/uso_lista/${uso._id}`;
      linkEditar.textContent = 'Editar';
      tdEditar.appendChild(linkEditar);
      tr.appendChild(tdEditar);
  
      const tdExcluir = document.createElement('td');
      const linkExcluir = document.createElement('a');
      // linkExcluir.href = `/uso/delete/${uso._id}`;
      linkExcluir.href='#';
      linkExcluir.classList.add('text-danger');
      linkExcluir.textContent = 'Excluir';
      linkExcluir.addEventListener('click', (event) => excluir_registro(event, uso._id));
    //   linkExcluir.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     if (confirm('Você quer realmente excluir este item?')) {
    //         console.log(uso._id);
    //         window.location.href = `/uso/delete/${uso._id}`;
    //     }
    // });
      tdExcluir.appendChild(linkExcluir);
      tr.appendChild(tdExcluir);
  
      // ... (repetir para as demais colunas)
  
      tbody.appendChild(tr);
    });
  }

  function excluir_registro(event, usoId) {
    event.preventDefault();

    const confirma = confirm(`Você está excluindo o registro id: ${usoId}?`);

    if (confirma) {
      // Aqui você pode adicionar a lógica para excluir o item, por exemplo, fazer uma requisição fetch para o servidor
      console.log('Item excluído');
      console.log(usoId);
      window.location.href = `/uso/delete/${usoId}`; //substitui o fetch
      // fetch(`/uso/delete/${uso._id}`, { method: 'DELETE' })
      //     .then(response => response.json())
      //     .then(data => {
      //         console.log(data);
      //         // Atualize a interface do usuário, se necessário
      //     })
      //     .catch(error => console.error('Erro:', error));
      } else {
      console.log('Ação de exclusão cancelada');
      }
    }
  
    function formataData(dt) {
        if(dt) {
            moment.locale('pt-BR');      
            //console.log(dt);
            //console.log(uso);
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
        }
    };

    function completarComZeroRso(num) {
      if(num) {
        const numRso = num.toString();
        return numRso.padStart(4, "0");
      }
    };
    
  const tabelaUsos = criarTabelaUsos();
  popularTabela(uso, tabelaUsos);
  
  const containerElem = document.getElementById('tbContainer');
  containerElem.appendChild(tabelaUsos);