$(document).ready(function() {
    $('#login-form').submit(function(event) {
        event.preventDefault();
        var username = $('#username').val();
        var password = $('#password').val();
        if (username === 'admin' && password === '123') {
            window.location.href = 'index.html';
        } else {
            alert('Nombre de usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.');
        }
    });
});
$(document).ready(function() {
    // Actualizar cantidad de productos en el carrito
    var cantidadCarrito = 0;
    var productosCarrito = [];
    var precios = {
        1: 10.00,
        2: 20.00,
        3: 30.00
    };
    $('#suma1, #suma2, #suma3').on('click', function() {
        var id = $(this).attr('id').replace('suma', '');
        var cantidad = parseInt($('#cantidad' + id).val());
        cantidad++;
        $('#cantidad' + id).val(cantidad);
        productosCarrito.push({ id: id, cantidad: cantidad });
        cantidadCarrito += cantidad;
        $('#cantidad-carrito').text(cantidadCarrito);
        actualizarCarrito();
    });

    $('#resta1, #resta2, #resta3').on('click', function() {
        var id = $(this).attr('id').replace('resta', '');
        var cantidad = parseInt($('#cantidad' + id).val());
        if (cantidad > 0) {
            cantidad--;
            $('#cantidad' + id).val(cantidad);
            productosCarrito = productosCarrito.filter(function(producto) {
                return producto.id !== id || producto.cantidad > 1;
            });
            if (productosCarrito.length === 0) {
                cantidadCarrito = 0;
            } else {
                cantidadCarrito -= cantidad;
            }
            $('#cantidad-carrito').text(cantidadCarrito);
            actualizarCarrito();
        }
    });

    // Actualizar carrito de compras
    function actualizarCarrito() {
        var html = '';
        productosCarrito.forEach(function(producto) {
            html += '<li>' + producto.id + ' x ' + producto.cantidad + ' = ' + (precios[producto.id] * producto.cantidad).toFixed(2) + '</li>';
        });
        $('#productos-carrito').html(html);
        $('#total-carrito').text(cantidadCarrito);
    }

    // Pagar
    $('#pagar').on('click', function() {
        // Abrir modal de confirmación
        $('#modal-confirmacion').modal('show');
        setTimeout(function() {
            // Cerrar modal y redirigir a página principal
            $('#modal-confirmacion').modal('hide');
            window.location.href = 'index.html';
        }, 5000);
    });
});