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
            },
            messages: {
                email: {

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

// configurando o JQuery Autocomplete do contato_cad
async function lista_placa() {

    const array_placa = [];

    const endpoint = '/teste01/lista_placa';

    const response = await fetch(endpoint);
    console.log('linha 56 geral.js' + response);
    const data = await response.json();
    console.log('linha 58 geral.js' + data);
    data.forEach((item) => {
      const campo_placa = item.placa
      array_placa.push(campo_placa);            
    });

    // configurando o JQuery Autocomplete
    $(document).ready(function() {
      console.log(array_placa);
      // O elemento que será usado como input
      input:$("#nome").autocomplete({
      source: array_placa
        // autoSelectFirst : true,
        // minLength:2,
        // height: 300,
      });
    });
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


