import view from '../views/factura.html';

export default () => {

    const Element = document.createElement('div');
    Element.innerHTML = view

    //Funciones o metodos
    const on =(element, event, selector, handler)=>{
        element.addEventListener(event, e =>{
            if(e.target.closest(selector)){
                handler(e)
            }            
        });
    };

    var Factura = JSON.parse(String(window.localStorage.getItem('ProductoFacturacion')));

    var formulario = Element.querySelector('#formFacturaCompraCompra');
   
    formulario['serie'].value = Factura.serie;
    formulario['numero'].value = Factura.numero;
    formulario['fecha'].value = Factura.fecha;
    formulario['nit'].value = Factura.nit;
    formulario['nombre'].value = Factura.Nombre;
    formulario['direccion'].value = Factura.direccion;
    
    var Total = 0; 
    Factura.productos.forEach(producto => {
        Element.querySelector('.Tabla-ProductosFactura-row').innerHTML+=`
        <tr id="${producto.idProducto}">
        <th scope="row">${producto.idProducto}</th>
        <td>${producto.nombreProducto}</td>
        <td>${producto.cantidad}</td>
        <td>${producto.precio}</td>
        <td>${(producto.precio * producto.cantidad)}</td>
        </tr>`;

        Total += parseFloat(producto.precio) * parseFloat(producto.cantidad);
    });

    Element.querySelector('#TotalCompraFactura').value = Total.toFixed(2);

    setTimeout(function(){ window.print(); }, 500);

    document.getElementById('idProductos').innerHTML = '[]';
    document.querySelector('.blue').innerHTML = '0';

    on(Element, 'click', '#idRealizarNuevaCompra', async (e) =>{
        window.location.href = 'http://localhost:5501/#';
    });



    return Element;
};