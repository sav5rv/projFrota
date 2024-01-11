function myFunction() {
    document.getElementById("demo").innerHTML = "Paragraph changed.";
};



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


} )