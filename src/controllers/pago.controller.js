import view from '../views/pago.html';



const createFactura = async (Factura) => {
    try {
        return await fetch( 'https://localhost:44366/api/Factura',{ method: 'POST', body : JSON.stringify(Factura), headers: {"Content-type": "application/json"}})
        .then(response =>{ if(!response){throw new Error(response.statusText)} return response.json()});
        
    } catch (error) {
        console.log(error);
    }
}


const emailFactura = async (email) => {
    try {
        return await fetch( 'https://localhost:44366/api/Email/',{ method: 'POST', body : JSON.stringify(email), headers: {"Content-type": "application/json"}})
        .then(response =>{ if(!response){throw new Error(response.statusText)} return response.json()});
        
    } catch (error) {
        console.log(error);
    }
}





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


    function CreateGuid() {  
        function _p8(s) {  
           var p = (Math.random().toString(16)+"000000000").substr(2,8);  
           return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;  
        }  
        return _p8() + _p8(true) + _p8(true) + _p8();  
     }  

     function formatoFecha(fecha, formato) {
        const map = {
            dd: fecha.getDate() < 10 ? '0' + fecha.getDate().toString() : fecha.getDate(),
            mm: fecha.getMonth() + 1,
            yy: fecha.getFullYear(),
            yyyy: fecha.getFullYear()
        }
    
        return formato.replace(/dd|mm|yy|yyy/gi, matched => map[matched])
    }


     var guid = CreateGuid();  

     var fecha = new Date();
     var fechaFormat = formatoFecha(fecha, 'yy-mm-dd');

     var productos = JSON.parse(String(window.localStorage.getItem('ProductosCompra')));

     console.log(productos);
     var TotalVenta = 0.0;
     productos.forEach(producto =>{
         TotalVenta = ((producto.CantidaProducto * parseFloat(producto.precioConIva)) + parseFloat(TotalVenta)).toFixed(2);
     });

     console.log(TotalVenta);
     Element.querySelector('#idTotalFactura').value = TotalVenta;

     var metodoPago = {
        id: 1,
        metodo: "Efectivo"
    }

    on(Element, 'change', '#idMetodoPago', (e) =>{
        e.preventDefault();
   
        var metodo = Element.querySelector('#idMetodoPago');

        var dato = Element.querySelector('.RowNumber');

        if(dato != undefined){
            dato.remove();
        }

        var cliente = JSON.parse(String(window.localStorage.getItem('loginCliente')));

        var form = Element.querySelector('#form-metodo-Pago');
        if(metodo.value == 3){
            form.innerHTML += `
            <div id="row" class="RowNumber">
            <div class="form-group" style="width: 245px;">
                <label for="last-name">No Tarjeta</label>
                <input type="number" class="form-control" placeholder="" name="">
            </div>
            <div class="form-group" style="width: 245px;">
                <label for="last-name">CVV</label>
                <input type="number" class="form-control" placeholder="" name="">
            </div>
            <div class="form-group" style="width: 245px;">
                <label for="last-name">Fecha Vencimiento</label>
                <input type="date" class="form-control" placeholder="" name="">
            </div>
           </div>
            `;
        }
        else if(metodo.value == 1){
            form.innerHTML += `
            <div id="row" class="RowNumber">
            <div class="form-group" style="width: 245px;">
                <label for="last-name">No Referencia</label>
                <input type="number" class="form-control" placeholder="" name="">
            </div>
            <div class="form-group" style="width: 245px;">
                <label for="last-name">Monto</label>
                <input type="number" class="form-control" placeholder="" name="">
            </div>
            <div class="form-group" style="width: 245px;">
                <label for="last-name">Fecha</label>
                <input type="date" class="form-control" placeholder="" name="">
            </div>
        </div>
            `;
        }

        form['Nit'].value       = cliente.nit;
        form['Nombre'].value    = cliente.nombre +" "+ cliente.apellido;
        form['Telefono'].value  = cliente.telefono;
        form['Direccion'].value = cliente.direccion;


        if(metodo.value == 1)
        {
            metodoPago.id = 1;
            metodoPago.metodo = "Deposito";

        }else if(metodo.value == 2) {
            metodoPago.id = 2;
            metodoPago.metodo = "Efectivo";

        }else if(metodo.value == 3){
            metodoPago.id = 2;
            metodoPago.metodo = "Tarjeta de Credito / Debito";
        }

        metodo.selectedIndex = metodo.value;

        Element.querySelector('#idNumeroFact').value = guid;
        Element.querySelector('#idFechaFactura').value = fechaFormat;
        Element.querySelector('#idTotalFactura').value = TotalVenta;
    });


     on(Element, 'click', '#IdRealizarCompra', async (e) =>{
        var formulario = Element.querySelector('#form-metodo-Pago');


        var clienteDatos = JSON.parse(String(window.localStorage.getItem('loginCliente')));

        const form = new FormData(formulario)
        var cliente = {
            serie: "A",
            numero: guid,
            fecha: fechaFormat.toString(),
            idCliente: clienteDatos.id,
            idTienda: 2,
            idEmpleado: 2,
            descuento: 0,
            idMetodoPagos: metodoPago.id,
            facturaDetalles: []
        }

        productos.forEach(producto =>{

            var product = {
                idProducto: producto.id,
                cantidad: producto.CantidaProducto
            }


            cliente.facturaDetalles.push(product)
        });

        console.log(cliente);
        var factura = await createFactura(cliente);


       

        var clienteFactura = {
            serie: "A",
            numero: guid,
            fecha: fechaFormat,
            nit   : clienteDatos.nit,
            Nombre: clienteDatos.nombre +" "+clienteDatos.apellido,
            correo: clienteDatos.correo,
            telefono: clienteDatos.telefono,
            direccion: clienteDatos.direccion,
            MetodoPago: metodoPago.metodo,
            productos: []
        }

        productos.forEach(producto =>{

            var product = {
                idProducto: producto.id,
                nombreProducto: producto.nombre,
                precio: producto.precioSinIva,
                cantidad: producto.CantidaProducto
            }


            clienteFactura.productos.push(product)
        });

        var clienteEnviado = await emailFactura(clienteFactura);

        console.log(clienteEnviado);

        window.localStorage.setItem('ProductoFacturacion', JSON.stringify(clienteFactura));


        window.location.href = 'http://localhost:5501/#/factura';
    });
    
    return Element;
};

