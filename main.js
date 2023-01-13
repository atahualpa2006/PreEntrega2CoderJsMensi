// Se crea vector para carro de compras.
const carrito = []

// Se ordenan productos de menor a mayor con el metodo de comparacion Sort.
const ordenarMenorMayor = () => {
    productos.sort((a, b) => a.precio - b.precio)
    mostrarListaOrdenada()
};

// Se ordenan productos de mayor a menor con el metodo de comparacion Sort.
const ordenarMayorMenor = () => {
    productos.sort((a, b) => b.precio - a.precio)
    mostrarListaOrdenada()
};

// Se muestra lista de productos con el metodo Map nuevo array de nombre del producto y precio.
// Se utiliza metodo join para ver la lista de elementos con un salto de linea.
const mostrarListaOrdenada = () => {
    const listaDeProductos = productos.map(producto => {
        return '- '+producto.nombre+' $'+producto.precio
    })
    alert('Lista de precios:'+'\n'+listaDeProductos.join('\n'))
    comprarProductos(listaDeProductos)
};

// Se realiza la compra de elementos y se parsea la cantidad.
// Se utiliza metodo Find siendo True se utiliza metodo ToUpperCase para evitar errores de tipeo.
// Se verifica si el elemento existe.
// Se utiliza metodo join para ver la lista de elementos con un salto de linea.
const comprarProductos = (listaDeProductos) => {
    let productoNombre = ''
    let productoCantidad = 0
    let otroProducto = false

    do {
        productoNombre = prompt('¿Qué elemento le gustaria adquirir?'+'\n\n'+listaDeProductos.join('\n'))
        productoCantidad = parseInt(prompt('¿Cuántos desea comprar?'))

        const producto = productos.find(producto => producto.nombre.toUpperCase() === productoNombre.toUpperCase())

        if (producto) {
            agregarAlCarrito(producto, producto.id, productoCantidad)
        } else {
            alert('El elemento no se encuentra en nuestra lista, por favor verifique.')
        }

        otroProducto = confirm('Desea incorporar otro elemento?')
    } while (otroProducto);

    confirmarCompra()
};

// Se agrega elemento al carro de compras a traves del metodo Push.
// Se utiliza metodo Find sumando cantidad en los elementos repetidos o agregando nuevos.
const agregarAlCarrito = (producto, productoId, productoCantidad) => {
    const productoRepetido = carrito.find(producto => producto.id === productoId)
    if (!productoRepetido) {
        producto.cantidad += productoCantidad
        carrito.push(producto)
    } else {
        productoRepetido.cantidad += productoCantidad
    }
};

// Se recorre el array con el metodo ForEach.
// Se elimina elemento del carro de compras a traves del metodo Splice.
// Se utiliza metodo ToUpperCase para evitar errores de minusculas y mayusculas en el tipeo.
const eliminarProductoCarrito = (nombreProductoAEliminar) => {
    carrito.forEach((producto, index) => {
        if (producto.nombre.toUpperCase() === nombreProductoAEliminar.toUpperCase()) {
            if (producto.cantidad > 1) {
                producto.cantidad--
            } else {
                carrito.splice(index, 1)
            }
        }
    })
    confirmarCompra()
};

// Se confirma compra de elementos. 
const confirmarCompra = () => {
    const listaProductos = carrito.map(producto => {
        return '- '+producto.nombre+' ~ Cantidad: '+producto.cantidad
    })

    const isCheckout = confirm('Checkout: '
        +'\n'+listaProductos.join('\n')
        +'\nPara seguir comprando presione "Aceptar" o "Cancelar" para quitar un elemento del carro'
    )

    if (isCheckout) {
        finalizarCompra(listaProductos)
    } else {
        const nombreProductoAEliminar = prompt('Escriba el elemento adquirido que desea eliminar del carro:')
        eliminarProductoCarrito(nombreProductoAEliminar)
    }
};

// Se finaliza la compra. 
// Se utiliza metodo Reduce para obtener la suma todos los precios de la compra.
// Se utiliza metodo join y obtenemos listado de productos comprados.
const finalizarCompra = (listaProductos) => {
    const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0)
    const precioTotal = carrito.reduce((acc, item) => acc + (item.cantidad * item.precio), 0)
    alert('Detalle de compra: '
        +'\n'+listaProductos.join('\n')
        +'\nTotal de elementos adquiridos: '+cantidadTotal
        +'\nTotal comprado:$ '+precioTotal
        +'\nExcelente compra, Felicitaciones!'
    )
};

// Se ordenan elementos por valor economico 
const comprar = () => {
    const productosEconimicos = confirm('¿Desea ordenar elementos del mas economico al mas caro?')

    if (productosEconimicos) {
        ordenarMenorMayor()
    } else {
        ordenarMayorMenor()
    }
};


comprar()