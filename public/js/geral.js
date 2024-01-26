

  //comando para executar função após a pág ter sido carregada
window.addEventListener("load", function() {    
  //.....                    
});

window.addEventListener("load", capturaData());

window.addEventListener("load", capturaGeo());
window.addEventListener("load", capturaIP2());

//----------------------------------------------------------------------------------


function capturaData() {
    const dateTimeFormat = new Intl.DateTimeFormat("pt-BR", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
      
    const data = new Date();      
    const dataFormatada = dateTimeFormat.format(data);      
    console.log(dataFormatada);
    document.getElementById("criadoEm").innerHTML = dataFormatada;                    
};


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



// FUNÇÃO TESTE CONTATO_CAD
function myFunction() {
    document.getElementById("demo").innerHTML = "Paragraph changed.";
};

//---------------------------------------------------------------------------------

// JQuery Validate CAMPOS de CONTATO_CAD
$( document ).ready( function () {
    $( "#frm1" ).validate( {
            rules: {
                email: {

                },
                placa: {
                    required: true,
                    //regex: [a-zA-Z]{3}[a-zA-Z0-9]{4}
                    // message: 'O nome deve conter apenas letras.',
                    // maxlength: 7,
                    // minlength: 7,
                    // regex: '[A-Z]{3}[A-Z0-9]{4}',
                    // message: "erro"
                },
            },
            messages: {
                email: {

                },
                placa: {
                    required: "Por favor preencha o campo",
                    minlength: "Insira 7 caracteres",
                    // regex: "erro"
                },
            },

        errorElement: "em",

        errorPlacement: function ( error, element ) {
        // Adiciona a classe 'help-block' ao elemento error
            error.addClass( "help-block" );

            if ( element.prop( "type" ) === "checkbox" ) {
                error.insertAfter( element.parent( "label" ) );
            } else {
                error.insertAfter( element );
            }
        },

        highlight: function ( element, errorClass, validClass ) {
            $( element ).parents( ".col-sm-5" ).addClass( "has-error" ).removeClass( "has-success" );
        },

        unhighlight: function (element, errorClass, validClass) {
            $( element ).parents( ".col-sm-5" ).addClass( "has-success" ).removeClass( "has-error" );
        }
    } );
} );


//------------------------------------------------------------------------------

// configurando o JQuery Autocomplete do veiculo_cad
async function lista_placa() {

    const array_placa = [];
    const endpoint = '/veiculo/lista_placa';
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

    let placa = document.getElementById('placa');
    let renavan = document.getElementById('renavan');
    let chassi = document.getElementById('chassi');
    let prefixo = document.getElementById('prefixo');    
    let hodometro = document.getElementById('hodometro');
    let combustivel = document.getElementById('combustivel');
    let rodas = document.getElementById('rodas');
    let cor = document.getElementById('cor');    

    const form_placa = data.find(( form_placa ) => form_placa.placa === placa.value);
console.log(form_placa);
    placa.value = form_placa.placa;
    renavan.value = form_placa.renavan;
    chassi.value = form_placa.chassi;
    prefixo.value = form_placa.prefixo;
    hodometro.value = form_placa.hodometro;
    combustivel.value = form_placa.combustivel;
    rodas.value = form_placa.rodas;
    cor.value = form_placa.cor;
};
  
//lista_placa(); comando para chamar a função sem nenhuma ação anterior


//----------------------------------------------------------------------------------------------


// configurando o JQuery Autocomplete do campo email do contato_cad
async function lista_email_login() {

    try {
        const array_email = [];
        const endpoint = '/login/lista_email_login';
        const response = await fetch(endpoint);
        const data = await response.json();

        data.forEach((item) => {
        const campo = item.email
        array_email.push(campo);            
        });

        // configurando o JQuery Autocomplete
        $(document).ready(function() {
            console.log(array_email);
            // O elemento que será usado como input
            input:$("#email").autocomplete({
            source: array_email
                // autoSelectFirst : true,
                // minLength:2,
                // height: 300,
            });
        });

        let nome = document.getElementById('nome');
        let re = document.getElementById('re');
        let email = document.getElementById('email');
        let tipoUsuario = document.getElementById('tipoUsuario');


        // const email_value = email.value;
        // const index = users.indexOf({ email_value }); //forma de localizar o index do registro


        const form_email = data.find(( form_email ) => form_email.email === email.value);
console.log(form_email);
        nome.value = form_email.nome;
        re.value = form_email.re;
        tipoUsuario.value = form_email.tipoUsuario;

        // if (nome.value and re.value and tipoUsuario.value != )




        
    } catch(e) {
        console.log(e);
    }
};
  
//lista_email_login();


//----------------------------------------------------------------------------------------------


// preencher campo nome + re + tipoUsuario qd o campo email perder o foco
function completa_campo_contato_cad(email) {
    


    


}



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
  }



// ------------------------------------------------------------------------------------------------  


function formataMoeda() {
    let valor = document.getElementById("valor").value;
    valor = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(valor)
    document.getElementById("valor").value = valor;
}

// ------------------------------------------------------------------------------------------------ 

