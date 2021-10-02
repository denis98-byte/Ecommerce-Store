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
        <th scope="row">${count += 1}</th>
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
        <td style="padding-top: 60px;"><input type="number" value="1" style="width: 65px;"></td>
        <td style="padding-top: 60px;"><label for="">${producto.precioConIva}</label></td>
        <td style="padding-top: 60px;"><button type="button" class="btn btn-danger btnEliminarCarrito" value="${producto.id}"> <i class="fas fa-trash-alt"></i></button></td>
        </tr>
        `;
    });

    return Element;
};