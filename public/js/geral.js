
const rso             = document.getElementById('rso');    
const hodometroInicio = document.getElementById('hodometroInicio');    
const hodometroFim    = document.getElementById('hodometroFim');    
const hodometro       = document.getElementById('hodometro');

const placa       = document.getElementById('placa');
const renavan     = document.getElementById('renavan');
const chassi      = document.getElementById('chassi');
const prefixo     = document.getElementById('prefixo');    

const combustivel = document.getElementById('combustivel');
const rodas       = document.getElementById('rodas');
const cor         = document.getElementById('cor');

const nome        = document.getElementById('nome');
const re          = document.getElementById('re');
const email       = document.getElementById('email');
const tipoUsuario = document.getElementById('tipoUsuario');
const celular     = document.getElementById('celular');
const cnhRegistro = document.getElementById('cnhRegistro');
const categoria   = document.getElementById('categoria');
const validade    = document.getElementById('validade');
const obs         = document.getElementById('obs');

const valor       = document.getElementById('valor');
  //comando para executar função após a pág ter sido carregada
// window.addEventListener("load", function() {    
//   //.....                    
// });

//window.addEventListener("load", capturaData());

//window.addEventListener("load", capturaGeo());
//window.addEventListener("load", capturaIP2());

//----------------------------------------------------------------------------------


// function capturaData() {
//     const dateTimeFormat = new Intl.DateTimeFormat("pt-BR", {
//         day: "numeric",
//         month: "numeric",
//         year: "numeric",
//         hour: "numeric",
//         minute: "numeric",
//         second: "numeric",
//       });
      
//     const data = new Date();      
//     const dataFormatada = dateTimeFormat.format(data);      
//     console.log(dataFormatada);
//     document.getElementById("criadoEm").innerHTML = dataFormatada;                    
// };


//---------------------------------------------------------------------------------

  


function capturaIP(){
    // https://pt.stackoverflow.com/questions/170188/como-obter-o-ip-do-usu%C3%A1rio-via-javascript
    // var xmlhttp = new XMLHttpRequest();
    // xmlhttp.open("GET", 'http://meuip.com/api/meuip.php');
    // xmlhttp.send();
    // xmlhttp.onload = function(e) {
    //   alert("Seu IP é: "+xmlhttp.response);
    // }

    $(function() {
        $.getJSON("https://api.ipify.org?format=jsonp&callback=?",
         function(json) {
          //document.write("Meu IP público é: ", json.ip);
          document.getElementById("ip").innerHTML = json.ip;
         }
        );
       });    
};

//---------------------------------------------------------------------------------

function capturaGeo(){ 
    if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);

    } else {
            alert("O seu navegador não suporta Geolocalização.");
    }
    function showPosition(position){
        //alert("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);  
        console.log("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);
        document.getElementById("geo").innerHTML = "Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude;
     }
};



//---------------------------------------------------------------------------------

// comando do Btn Cancelar e Voltar nos formulários

    // const btnCancelar = document.querySelector("#btnCancelar");
    // const formulario = document.querySelectorAll("input");

    // btnCancelar.addEventListener("click", function() { // executada qd é clicado no btnCancelar

    //     for (const campo of formulario) { // percorre todos os elementos input e atribui vazio
    //         campo.value = "";
    //     }
        
    //     history.back(); //voltar para página anterior

    // });  


    
//---------------------------------------------------------------------------------
//MASCARA DOS CAMPOS usando o CLEAVE

function mascara() {

    if(celular){
        new Cleave('#celular', {
            numericOnly: true,
            blocks: [0, 2, 0, 4, 4],
            delimiters: ["(", ")", " ", "-"]
        });
    };

    if(cnhRegistro){
        new Cleave('#cnhRegistro', {
            numericOnly: true,
            blocks: [9]
        });
    };

    if(re){
        new Cleave('#re', {
            numericOnly: true,
            blocks: [7]
        });
    };

};



// ------------------------------------------------------------------------------------------------  


function formataMoeda() {
    let moeda = valor.value;

    moeda = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(moeda);
    valor.value = moeda;
};



function formataMoeda2() {
    new Cleave('#valor', {
        numeral: true,
        prefix: 'R$ ',
        numeralDecimalMark: ',',
        delimiter: '.'
    });
    
};


//---------------------------------------------------------------------------------
// FUNÇÃO TESTE CONTATO_CAD
function myFunction() {
    document.getElementById("demo").innerHTML = "Paragraph changed.";

};



//------------------------------------------------------------------------------
// trata a QUANTIDADE DE CARACTERES que é permitido dentro do input tipo numero


if(rso){
    document.getElementById("rso").addEventListener("input", function() {
        if (this.value.length > 4) {
        this.value = this.value.slice(0, 4);
        }
    });
};

if(hodometroInicio){
    document.getElementById("hodometroInicio").addEventListener("input", function() {
        if (this.value.length > 6) {
        this.value = this.value.slice(0, 6);
        }
    });
};

if(hodometroFim){
    document.getElementById("hodometroFim").addEventListener("input", function() {
        if (this.value.length > 6) {
        this.value = this.value.slice(0, 6);
        }
    });
}

if(hodometro){
    document.getElementById("hodometro").addEventListener("input", function() {
        if (this.value.length > 6) {
        this.value = this.value.slice(0, 6);
        }
    });
};



//------------------------------------------------------------------------------
// completar COM ZERO 

function completarComZeroRso() {
    const numRso = rso.value;
    // Retorna o número com zeros à esquerda até ter 4 caracteres
    rso.value = numRso.padStart(4, "0");
};


function completarComZeroHod() {
    const numHodometro = hodometro.value;
    hodometro.value = numHodometro.padStart(6, "0");
};


function completarComZeroHodInicio() {
    const numHodometroInicio = hodometroInicio.value;
    hodometroInicio.value = numHodometroInicio.padStart(6, "0");
};


function completarComZeroHodFinal() {
    const numHodometroFim = hodometroFim.value;
    hodometroFim.value = numHodometroFim.padStart(6, "0");
};


function completarComZeroCnhRegistro() {
    const numCnhRegistro = cnhRegistro.value;
    cnhRegistro.value = numCnhRegistro.padStart(9, "0");
};


function completarComZeroRE() {
    const numRe = re.value;
    re.value = numRe.padStart(7, "0");
};



//------------------------------------------------------------------------------

//somente FETCH em veículo placa
async function buscar_placa() {
    try {
        const endpoint = '/veiculo/lista_placa';
        const response = await fetch(endpoint);
        const dados_fetch = await response.json();
    
        if(!dados_fetch) return console.log('erro');
        return dados_fetch;
        
    } catch (error) {
        console.log('Deu erro: ' + error);
    }
}


//---------------------------------------------------------------------------------

// configurando o JQuery Autocomplete do veiculo_cad
async function lista_placa() {

    const array_placa = [];
    const dados_fetch = await buscar_placa();

    dados_fetch.forEach((item) => {
      const campo_placa = item.placa
      array_placa.push(campo_placa);            
    });

               // configurando o JQuery Autocomplete
    $(document).ready(function() {
              // O elemento que será usado como input
      input:$("#placa").autocomplete({
      source: array_placa,
        // autoSelectFirst : true,
              minLength:1,
              height: 300,
      });
    });    

    const form_placa = dados_fetch.find(( form_placa ) => form_placa.placa === placa.value);

    placa.value       = form_placa.placa;
    renavan.value     = form_placa.renavan;
    chassi.value      = form_placa.chassi;
    prefixo.value     = form_placa.prefixo;
    hodometro.value   = form_placa.hodometro;
    combustivel.value = form_placa.combustivel;
    rodas.value       = form_placa.rodas;
    cor.value         = form_placa.cor;

};
  
//lista_placa(); comando para chamar a função sem nenhuma ação anterior


//----------------------------------------------------------------------------------------------

    // Preenchimento do select placa em USO_ABRIR

    async function select_placa() {

        try {
            const dados_fetch = await buscar_placa();
            
            console.log(dados_fetch);
            console.log(typeof dados_fetch);

            const select = document.getElementById("placa");
            // O loop repetirá uma vez para cada elemento presente em dados_fetch
            // Em cada iteração, o valor atual do elemento será atribuído à variável X
            for (const x of dados_fetch) {
                const option = document.createElement("option");
                
                option.value = x.placa;       //conteúdo do valor
                option.textContent = x.placa; //conteúdo do texto

                select.appendChild(option);
            }
            
        } catch (error) {
            console.log('Deu erro: ' + error);
        }

    }

//----------------------------------------------------------------------------------------------


async function buscar_email_login() {

    const endpoint = '/login/lista_email_login';
    const response = await fetch(endpoint);
    const dados_fetch = await response.json();

    if(!dados_fetch) return console.log('erro');
    return dados_fetch;
};

//----------------------------------------------------------------------------------------------

// configurando o JQuery Autocomplete do campo email do contato_cad
async function lista_email_login() {

    try {
        const dados_fetch = await buscar_email_login();
console.log(dados_fetch);
        const array_email = [];        

        dados_fetch.forEach((item) => {
        const campo = item.email
        array_email.push(campo);            
        });

        // configurando o JQuery Autocomplete
        $(document).ready(function() {
            input:$("#email").autocomplete({
            source: array_email,
        });
    });
    } catch(e) {
        console.log(e);
    }
};

//----------------------------------------------------------------------------------------------

// configurando o JQuery Autocomplete do campo email do contato_cad
async function lista_email_login_2() {
    try {
        const dados_fetch = await buscar_email_login();

        const form_email = dados_fetch.find(( form_email ) => form_email.email === email.value);
        console.log(form_email);             //cuidado para não retornar a senha * * * * * * * *
        idForm.value      = form_email._id; 
        nome.value        = form_email.nome;
        re.value          = form_email.re;
        tipoUsuario.value = form_email.tipoUsuario;

        if (nome.value != " " & re.value != " " & tipoUsuario.value != " ") {
            console.log(nome.value);
            console.log(re.value);
            console.log(tipoUsuario.value);
            // btnSalvar.disabled = true;
            // nome.disabled        = true;
            // re.disabled          = true;
            // tipoUsuario.disabled = true;
            // celular.disabled     = true;
            // cnhRegistro.disabled = true;
            // categoria.disabled   = true;
            // validade.disabled    = true;
            // obs.disabled         = true;
            
            console.log('teste');
        };

    } catch (error) {
        console.log('Deu erro: ' + error);
    };
};

        // const email_value = email.value;
        // const index = users.indexOf({ email_value }); //forma de localizar o index do registro




//----------------------------------------------------------------------------------------------

// configurando o JQuery Autocomplete do uso_abrir
async function lista_campo_placa() {

    const array_placa = [];
    const endpoint = '/veiculo/lista_campo_placa';
    const response = await fetch(endpoint);
    const data = await response.json();

    data.forEach((item) => {
      const campo_placa = item.placa
      array_placa.push(campo_placa);            
    });

               // configurando o JQuery Autocomplete
    $(document).ready(function() {
      console.log(array_placa);
              // O elemento que será usado como input
      input:$("#placa").autocomplete({
      source: array_placa,
        // autoSelectFirst : true,
              minLength:1,
              height: 300,
      });
    });


};



//------------------------------------------------------------------------------------------------------

//script de teste em contato_cad para o JQuery AutoComplete


// $(".my-element").click(function() {
//   // Chama a função myFunction() com o contexto do elemento HTML
//   myFunction.call(this);
// });


// chamar uma função dentro do JQUERY
// $("#nome").click(function() {
//   alert("Hello, world!");
// });




// $('#nome').click(function() {
//   let x = [];
//   x = lista_placa.call(this);
//   console.log(x);
// //   // O elemento que será usado como input
//   input:$("#nome").autocomplete({
//     source: x
//     // autoSelectFirst : true,
//     // minLength:2,
//     // height: 300,
//   });
// });



// retornando array vazio - a lista esta vazia ou espremida
// $(document).ready(function() {
//             //   // O elemento que será usado como input
//   input:$("#nome").autocomplete({
//     source: '/teste01/lista_placa',
//     autoSelectFirst : true,
//     minLength:2,
//     height: 300,
//   });
// });


//alert('linha 159');


// validação campos tela login
$(document).ready(function() {
    $("#frmLoginIndex").validate();
  });





// $(document).ready(function() {
//   // A lista de opções que serão apresentadas
//   var x = ["Brasil", "EUA", "Canadá", "Argentina", "México"];

//   // O elemento que será usado como input
//   input:$("#email").autocomplete({
//     source: x
//   });            
// });



// $( function() {
//   var availableTags = [
//   "ActionScript",
//   "AppleScript",
//   "Asp",
//   "BASIC",
//   "C",
//   "C++",
//   "Clojure",
//   "COBOL",
//   "ColdFusion",
//   "Erlang",
//   "Fortran",
//   "Groovy",
//   "Haskell",
//   "Java",
//   "JavaScript",
//   "Lisp",
//   "Perl",
//   "PHP",
//   "Python",
//   "Ruby",
//   "Scala",
//   "Scheme"
//   ];
//   $( "#email" ).autocomplete({
//     source: availableTags
//   });
// } );


//-----------------------------------------------------------------------------------------------------

function enviarEmail() {
    // Obtém os dados do formulário
    const nome     = document.getElementById("fale_nome").value;
    const email    = document.getElementById("fale_email").value;
    const assunto  = document.getElementById("fale_assunto").value;
    const mensagem = document.getElementById("fale_msg").value;
  
    // Cria um objeto com os dados do formulário
    const dados = {
      nome: nome,
      email: email,
      assunto: assunto,
      mensagem: mensagem,
    };
  
    // Envia o email
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/wsavioli@proton.me");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(dados));
  
    // Verifica o status da resposta
    xhr.onload = function() {
      if (xhr.status === 200) {
        // Email enviado com sucesso
        alert("Email enviado com sucesso!");
      } else {
        // Erro ao enviar o email
        alert("Ocorreu um erro ao enviar o email.");
      }
    };
  };



//---------------------------------------------------------------------------------

// JQuery Validate CAMPOS de CONTATO_CAD

// $( document ).ready( function () {
//     // $("#hodometo").mask("999.999");
//     $( "#frm1" ).validate( {
//             rules: {
//                 email: {

//                 },
//                 placa: {
//                     required: true,
//                     //regex: [a-zA-Z]{3}[a-zA-Z0-9]{4}
//                     // message: 'O nome deve conter apenas letras.',
//                     // maxlength: 7,
//                     // minlength: 7,
//                     // regex: '[A-Z]{3}[A-Z0-9]{4}',
//                     // message: "erro"
//                 },

//                 hodometro: {
//                     required: true,
//                     min: 5,
//                 },

//                 obs: {
//                     required: true,
//                     minLength: 2,
//                     maxLength: 5,
//                 },
//             },
            
//             messages: {
//                 email: {

//                 },

//                 placa: {
//                     required: "Por favor preencha o campo",
//                     minlength: "Insira 7 caracteres",
//                     // regex: "erro"
//                 },

//                 hodometro: {
//                     require: "Por favor preencha o campo",
//                     min: "Confira o hodometro",
//                 },

//                 obs: {
//                     required: "Por favor preencha o campo",
//                     minlength: "Insira minimo 2 caracteres",
//                     maxLength: "5",
//                 }, //não funcionou correto
//             },

//         errorElement: "em",

//         errorPlacement: function ( error, element ) {
//         // Adiciona a classe 'help-block' ao elemento error
//             error.addClass( "help-block" );

//             if ( element.prop( "type" ) === "checkbox" ) {
//                 error.insertAfter( element.parent( "label" ) );
//             } else {
//                 error.insertAfter( element );
//             }
//         },

//         highlight: function ( element, errorClass, validClass ) {
//             $( element ).parents( ".col-sm-5" ).addClass( "has-error" ).removeClass( "has-success" );
//         },

//         unhighlight: function (element, errorClass, validClass) {
//             $( element ).parents( ".col-sm-5" ).addClass( "has-success" ).removeClass( "has-error" );
//         }
//     } );
// } );