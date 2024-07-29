// pegando as inf passados do Bc ao Html e do Html ao JS
const validar = dadosBc;

  
  function criarTabelaValidar() {
    const tabela = document.createElement('table');
    tabela.classList.add('table', 'table-striped');
  
    const thead = document.createElement('thead');
    const trCabecalho = document.createElement('tr');
  
    // Criar e adicionar células de cabeçalho
    const thNome = document.createElement('th');
    thNome.textContent = 'Nome';
    trCabecalho.appendChild(thNome);
    
    const thRE = document.createElement('th');
    thRE.textContent = 'RE';
    trCabecalho.appendChild(thRE);

    const thEmail = document.createElement('th');
    thEmail.textContent = 'EMail';
    trCabecalho.appendChild(thEmail);

    const thTipoUsuario = document.createElement('th');
    thTipoUsuario.textContent = 'Tipo Usuário';
    trCabecalho.appendChild(thTipoUsuario);

    const thCriado = document.createElement('th');
    thCriado.textContent = 'Criado Em';
    trCabecalho.appendChild(thCriado);

    const thId = document.createElement('th');
    thId.textContent = 'iD';
    trCabecalho.appendChild(thId);

    const thValidar = document.createElement('th');
    thValidar.textContent = 'Validar';
    trCabecalho.appendChild(thValidar);    

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
  
  function popularTabela(validar, tabela) {
    const tbody = tabela.querySelector('tbody');
  
    validar.forEach(validar => {
      const tr = document.createElement('tr');
      
      const tdNome = document.createElement('td');
      tdNome.textContent = validar.nome;
      tr.appendChild(tdNome);
      
      const tdRE = document.createElement('td');
      tdRE.textContent = validar.re;
      tr.appendChild(tdRE);
      
      const tdEmail = document.createElement('td');
      tdEmail.textContent = validar.email;
      tr.appendChild(tdEmail);

      const tdtipoUsuario = document.createElement('td');
      tdtipoUsuario.textContent = validar.tipoUsuario;
      tr.appendChild(tdtipoUsuario);  
      
      const tdCriado = document.createElement('td');
      tdCriado.textContent = formataData(validar.criadoEm);
      tr.appendChild(tdCriado);

      const tdId = document.createElement('td');
      tdId.textContent = validar._id;
      tr.appendChild(tdId);

      const tdValidar = document.createElement('td');
      const linkValidar = document.createElement('a');
      linkValidar.href = `/contato/login_validar_lista/${validar._id}`;
      linkValidar.textContent = 'Validar';
      tdValidar.appendChild(linkValidar);
      tr.appendChild(tdValidar);
  
      const tdExcluir = document.createElement('td');
      const linkExcluir = document.createElement('a');
      linkExcluir.href='#';
      linkExcluir.classList.add('text-danger');
      linkExcluir.textContent = 'Excluir';
      linkExcluir.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm(`Você quer excluir o registro id: ${validar._id}?`)) {
            console.log(validar._id);
            window.location.href = `/contato/login_validar_delete/${validar._id}`;
        }
    });
      tdExcluir.appendChild(linkExcluir);
      tr.appendChild(tdExcluir);
  
      // ... (repetir para as demais colunas)
  
      tbody.appendChild(tr);
    });
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
    
  const tabelaValidar = criarTabelaValidar();
  popularTabela(validar, tabelaValidar);
  
  const containerElem = document.getElementById('tbContainer');
  containerElem.appendChild(tabelaValidar);

  const informeElement = document.getElementById('informe');
  informeElement.textContent = `Relação dos usuários com Login e ${validar.length} usuários sem Cadastro - CONTATO_VALIDAR`;