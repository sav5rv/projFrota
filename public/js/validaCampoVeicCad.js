function myFunction() {
    document.getElementById("demo").innerHTML = "Paragraph changed.";
};



$( document ).ready( function () {
    $( "#frm1" ).validate( {
        rules: {
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


} )