import view from '../views/carrito.html';


export default async () => {

    const Element = document.createElement('div');
    Element.innerHTML = view

    var listProductos =  JSON.parse(String(document.getElementById('idProductos').innerHTML));

    //Funciones o metodos
    const on =(element, event, selector, handler)=>{
        element.addEventListener(event, e =>{
            if(e.target.closest(selector)){
                handler(e)
            }            
        });
    };

    var productoss = JSON.parse(String(window.localStorage.getItem('listaProductos')));
    console.log(productoss);

    on(Element, 'click', '.btnEliminarCarrito', (e) =>{
        const id = e.target.closest('.btnEliminarCarrito').getAttribute('value');

        const producto = listProductos.find(producto => producto.id == id);
        const index = listProductos.indexOf(producto);
        listProductos.splice(index, 1);

        var productoIds = String(JSON.stringify(listProductos));

        document.getElementById('idProductos').innerHTML = productoIds;

        var carrito = document.querySelector('.blue');
        carrito.innerHTML = parseInt(carrito.innerHTML) - 1;

        const fila = Element.querySelector(`tr[id="${id}"]`);
        fila.remove();
    });
    
    on(Element, 'click', '#comprar-producto', (e) =>{

        var listaProductoCompra = []
        var resume_table = Element.querySelector('#carrito-compra');
        for (var i = 0, row; row = resume_table.rows[i]; i++) {
            var id       = parseInt(row.cells[0].innerText);
            var cantidad = parseInt(row.cells[3].children[0].value);

            const producto = listProductos.find(producto => producto.id == id);

            var product = {
                categoriaTipo:   producto.categoriaTipo, 
                descripcion:     producto.descripcion,
                garantia: 		 producto.garantia,
                id: 		     producto.id,
                idCategoria:     producto.idCategoria, 
                linkImagen:      producto.linkImagen,
                nombre: 		 producto.nombre,
                precioConIva:    producto.precioConIva, 
                precioSinIva:    producto.precioSinIva, 
                CantidaProducto : cantidad,
            }

            listaProductoCompra.push(product);
        }

        console.log(listaProductoCompra);
        
        window.localStorage.setItem('ProductosCompra', JSON.stringify(listaProductoCompra));

       // window.localStorage.setItem('listaProductos', productoIds);

        var sesion = String(window.localStorage.getItem('sesion'));

        if(sesion == 'Activa'){
            window.location.href = 'http://localhost:5501/#/pago';
        }else{
            window.location.href = 'http://localhost:5501/#/login';
        }
    });
    
    var count = 0;
    listProductos.forEach(producto => {
        Element.querySelector('#carrito-compra').innerHTML+=`
        <tr id="${producto.id}">
        <th scope="row">${producto.id}</th>
        <td>
            <div class="row">
                <div class="col-md" style="width: 70px;">
                    <div class="card" style="width: 10rem;">
                        <img src="${producto.linkImagen}" class="card-img-top" alt="">
                    </div>
                </div>
                <div class="col-md" style="width: 80px;">
                    <div style="width: 10rem;">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">${producto.descripcion}</p>
                    </div>
                </div>
            </div>
        </td>
        <td style="padding-top: 60px;"><label for="">${producto.precioConIva}</label></td>
        <td style="padding-top: 60px;"><input type="number" class="cantidaProducto" id="${producto.id}" value="1" style="width: 65px;"></td>
        <td style="padding-top: 60px;">${producto.precioConIva}</td>
        <td style="padding-top: 60px;"><button type="button" class="btn btn-danger btnEliminarCarrito" value="${producto.id}"> <i class="fas fa-trash-alt"></i></button></td>
        </tr>
        `;

        Element.querySelector('#TotalCompra').value = recorrerTabla().toFixed(2);
    });


    on(Element, 'click', '.btnEliminarCarrito', (e) =>{
        const id = e.target.closest('.btnEliminarCarrito').getAttribute('value');

        const producto = listProductos.find(producto => producto.id == id);
        const index = listProductos.indexOf(producto);
        listProductos.splice(index, 1);

        var productoIds = String(JSON.stringify(listProductos));

        document.getElementById('idProductos').innerHTML = productoIds;

        var carrito = document.querySelector('.blue');
        carrito.innerHTML = parseInt(carrito.innerHTML) - 1;

        const fila = Element.querySelector(`tr[id="${id}"]`);
        fila.remove();
    });


    on(Element, 'change', '.cantidaProducto', (e) =>{
        const id = e.target.closest('.cantidaProducto').getAttribute('id');
        var cantidad = e.target.closest('.cantidaProducto').value;

        const producto = listProductos.find(producto => producto.id == id);

        const fila = Element.querySelector(`tr[id="${id}"]`);
        fila.remove();

        Element.querySelector('#carrito-compra').innerHTML+=`
        <tr id="${producto.id}">
        <th scope="row">${producto.id}</th>
        <td>
            <div class="row">
                <div class="col-md" style="width: 70px;">
                    <div class="card" style="width: 10rem;">
                        <img src="${producto.linkImagen}" class="card-img-top" alt="">
                    </div>
                </div>
                <div class="col-md" style="width: 80px;">
                    <div style="width: 10rem;">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">${producto.descripcion}</p>
                    </div>
                </div>
            </div>
        </td>
        <td style="padding-top: 60px;"><label for="">${producto.precioConIva}</label></td>
        <td style="padding-top: 60px;"><input type="number" class="cantidaProducto" id="${producto.id}" value="${cantidad}" style="width: 65px;"></td>
        <td style="padding-top: 60px;">${producto.precioConIva * parseInt(cantidad) }</td>
        <td style="padding-top: 60px;"><button type="button" class="btn btn-danger btnEliminarCarrito" value="${producto.id}"> <i class="fas fa-trash-alt"></i></button></td>
        </tr>
        `;

        Element.querySelector('#TotalCompra').value = recorrerTabla().toFixed(2);

    });


    function recorrerTabla()
    {
        
        var total = 0;
        var resume_table = Element.querySelector('#carrito-compra');

        for (var i = 0, row; row = resume_table.rows[i]; i++) {
            total +=  parseFloat(row.cells[4].innerText)
        }
        return total;
    }

    return Element;
};