// FUNÇÃO TESTE CONTATO_CAD
function myFunction() {
    document.getElementById("demo").innerHTML = "Paragraph changed.";
};

//-----------------------------------------------------------------------

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


//-----------------------------------------------------------------------

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


//--------------------------------------------------------------


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


//-----------------------------------------------------------------------


// preencher campo nome + re + tipoUsuario qd o campo email perder o foco
function completa_campo_contato_cad(email) {
    


    


}



//-----------------------------------------------------------------------


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


//-----------------------------------------------------------------------

