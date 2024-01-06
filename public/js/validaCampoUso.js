function myFunction() {
    document.getElementById("demo").innerHTML = "Paragraph changed.";
};



$( document ).ready( function () {
    $( "#frm1" ).validate( {
        rules: {
            rso: {
                required: true
            },
            hodometroInicio: {
                required: true
            },
            
        },
        messages: {
            rso: {
                required: "Por favor preencha o campo",
                minlength: "Por favor insira 5 caracteres"
            },
            hodometroInicio: {
                required: "Por favor preencha o campo",
                minlength: "Por favor insira 9 caracteres"
            },
        },
        errorElement: "em",
        errorPlacement: function ( error, element ) {
            // Add the `help-block` class to the error element
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