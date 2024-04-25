/*Descripcion: Actividad 2-->
Desarrollodor; Jose Carlos Munoz ALberti
Fecha; Formato gringo 2024.04.24
Cambios; Implemento de funciones que van desde el calculo de la cotizacion, hasta algunas validaciones como el gmail y llenado
aparte implementamos eventos de click para algunos botones nuevos*/
var formData = {};

$(document).ready(function() {

    // Función para validar el formulario
    function validateForm() {
        var isValid = true;

        $('#nombre, #apellido, #direccion, #email, #ancho, #largo').each(function() {
            if ($(this).val().trim() === '') {
                alert('Faltan parámetros por llenar');
                isValid = false;
                return false; // Romper el loop
            }
        });

        var email = $('#email').val();
        var regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

        if (!regex.test(email)) {
            alert('ERROR: Por favor, ingresa un correo electrónico válido de Gmail');
            isValid = false;
        }

        return isValid;
    }

    // Función para calcular y mostrar la cotización
    function calculateQuote() {
        var ancho = parseFloat($('#ancho').val());
        var largo = parseFloat($('#largo').val());

        var mtrs = ancho * largo;
        var total = mtrs * 900;

        $('#mtr').text(mtrs.toFixed(2));
        $('#totali').text("Bs " + total.toFixed(2));

        formData = {
            Nombre: $('#nombre').val(),
            Apellido: $('#apellido').val(),
            Direccion: $('#direccion').val(),
            Email: $('#email').val(),
            Ancho: ancho.toFixed(2),
            Largo: largo.toFixed(2),
            Mtrs: mtrs.toFixed(2),
            Total: total.toFixed(2)
        };

        printFormData();
    }

    // Función para imprimir los datos del formulario
    function printFormData() {
        var formDataList = $('#formDataList');
        formDataList.empty();
    
        formDataList.append(
            '<tr>' +
            '<td>' + formData.Nombre + '</td>' +
            '<td>' + formData.Apellido + '</td>' +
            '<td>' + formData.Direccion + '</td>' +
            '<td>' + formData.Email + '</td>' +
            '<td>' + formData.Ancho + " m" + '</td>' +
            '<td>' + formData.Largo + '</td>' +
            '<td>' + formData.Mtrs + '</td>' +
            '<td>' + formData.Total + '</td>' +
            '<td><button class="btn btn-primary btn-sm edit-btn">Editar</button></td>' +
            '<td><button class="btn btn-danger btn-sm delete-btn">Eliminar</button></td>' +
            '</tr>'
        );
    }

    // Evento para calcular la cotización
    $('#send').on('click', function(e) {
        e.preventDefault();//Este método previene el comportamiento predeterminado del evento click, 
        //que en este caso es enviar un formulario (si el botón "send" está dentro de un formulario).

        if (!validateForm()) {
            return;
        }

        calculateQuote();

        $('.border').removeAttr('hidden');
        alert('Cotización Completada');
    });

    // Evento click para el botón de edición
    $('#formDataList').on('click', '.edit-btn', function() {
        var row = $(this).closest('tr');
        
        // Verificar si ya se ha iniciado la edición
        if (!row.hasClass('editing')) {
            // Habilitar la edición de los campos de la fila
            row.find('td').not(':last-child, :nth-last-child(2)').each(function(index) {
                if (index !== 4 && index !== 5 && index !== 6 && index !== 7) { // Índices de las columnas a no editar
                    var value = $(this).text();
                    $(this).html('<input class="form-control" value="' + value + '">');
                }
            });
            
            // Mostrar botones de aceptar y cancelar
            row.append('<td><button class="btn btn-success btn-sm accept-btn">Aceptar</button></td>');
            row.append('<td><button class="btn btn-danger btn-sm cancel-btn">Cancelar</button></td>');
            
            // Agregar clase para indicar que se está editando
            row.addClass('editing');
        }
    });

    // Evento click para el botón de aceptar
    $('#formDataList').on('click', '.accept-btn', function() {
        var row = $(this).closest('tr');
        
        // Obtener los nuevos valores de los campos de entrada
        row.find('td').not(':last-child, :nth-last-child(2)').each(function() {
            var value = $(this).find('input').val();
            $(this).text(value);
        });
        
        // Eliminar botones de aceptar y cancelar
        row.find('td:last-child, :nth-last-child(2)').remove();
        
        // Eliminar clase de edición
        row.removeClass('editing');
    });

    // Evento click para el botón de cancelar
    $('#formDataList').on('click', '.cancel-btn', function() {
        var row = $(this).closest('tr');
        
        // Restaurar los valores originales
        row.find('td').not(':last-child, :nth-last-child(2)').each(function() {
            var value = $(this).find('input').attr('value');
            $(this).text(value);
        });
        
        // Eliminar botones de aceptar y cancelar
        row.find('td:last-child, :nth-last-child(2)').remove();
        
        // Eliminar clase de edición
        row.removeClass('editing');
    });

    // Evento click para el botón de eliminar
    $('#formDataList').on('click', '.delete-btn', function() {
        $(this).closest('tr').remove();
    });

    // Agregar botones para mostrar/ocultar la tabla
    $('#tablaform').after('<div class="text-right mb-3">' +
                       '<button id="showTable" class="btn btn-info mr-2">Mostrar llenado</button>' +
                       '<button id="hideTable" class="btn btn-warning">Ocultar llenado</button>' +
                       '</div>');

    // Mostrar la tabla por defecto
    $('#formDataList').show();

    // Evento de click para el botón "Mostrar llenado"
    $('#showTable').on('click', function() {
        $('#formDataList').show();
    });

    // Evento de click para el botón "Ocultar llenado"
    $('#hideTable').on('click', function() {
        $('#formDataList').hide(); //.1..Usando Hide El método .hide() es una función de jQuery que oculta un elemento seleccionado. 
        //.2..Cuando un elemento se oculta con .hide(), su propiedad display se establece a none, 
        //.3..lo que significa que el elemento desaparece completamente de la vista, pero sigue existiendo en el DOM.
    });
});











