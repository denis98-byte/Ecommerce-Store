import view from '../views/catalogo.html';

const URL = 'https://localhost:44366/api/CatalogoProductos/';


const getCatalogo = async () => {
    try {
        return await fetch( URL,{ method: 'GET'})
        .then(response =>{ if(!response){throw new Error(response.statusText)} return response.json()});
        
    } catch (error) {
        console.log(error);
    }
}

const getCatalogoSearch = async (Search) => {
    try {
        
        return await fetch( URL + Search, { method: 'GET'})
        .then(response =>{ if(!response){throw new Error(response.statusText)} return response.json()});
        
    } catch (error) {
        console.log(error);
    }
}

const URL_PRODUCTO           = 'https://localhost:44366/api/producto/';

const getByIdProducto = async (id) =>{
    try {
        return  fetch(URL_PRODUCTO + id,{ method: 'GET'})
        .then(response =>{ if(!response){throw new Error(response.statusText)} return response.json()});
        
    } catch (error) {
        console.log(error);
    }
}

export default async () => {

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

    const catalogo = await getCatalogo();
    CargarCatalogo(catalogo);


    document.getElementById('buttom-Search-main').addEventListener('click', async () => {
        Element.querySelector('#catalogo-producto').innerHTML = '';
        const Search = document.getElementById('input-search').value;
        const catalogo = await getCatalogoSearch(Search);
        CargarCatalogo(catalogo);
    });

    on(Element, 'click', '.agregarProductoCarrito', async (e) =>{
        const id = e.target.closest('.agregarProductoCarrito').getAttribute('value');
        const producto = await getByIdProducto(id);

        var listProductos =  JSON.parse(String(document.getElementById('idProductos').innerHTML));
        listProductos.push(producto);

        var productoIds = String(JSON.stringify(listProductos));
        document.getElementById('idProductos').innerHTML = productoIds;

        var carrito = document.querySelector('.blue');
        carrito.innerHTML = parseInt(carrito.innerHTML) + 1;

        window.localStorage.setItem('listaProductos', productoIds);
    });

    function CargarCatalogo(catalogo) {
        for(var i = 0; i<= catalogo.length; i++){

            const row = Element.querySelector('#catalogo-producto').innerHTML += `
            <br/>
            <div class="row" id="Fila${i}">
            </div>
            `;
    
            const colum = Element.querySelector(`div[id="Fila${i}"]`);
    
            if(catalogo[i] !== undefined)
            {
                colum.innerHTML += `
                <div class="card" style="max-width: 304px; margin: 10px; padding: 0%">
                <img src="${catalogo[i].linkImagen}" class="card-img-top" alt="" style="max-width: 304px; height: 304; margin: 0 auto; padding-left: 12px; padding-right: 12px;">
                <div class="card-body" style="max-width: 304px; height: 140px; padding-left: 12px; padding-right: 12px;">
                  <h5 class="card-title">${catalogo[i].nombre}</h5>
                  <p class="card-text">${catalogo[i].descripcion}</p>
                </div>
                <P class="text-center" style="color:Red;">Q${catalogo[i].precioConIva}</p>
                <a href="#" class="btn btn-primary agregarProductoCarrito" value="${catalogo[i].id}"><i class="fas fa-cart-plus"></i></a>
                </div>
                `;
            }
    
            if(catalogo[i + 1] !== undefined)
            {
                colum.innerHTML += `
                <div class="card" style="max-width: 304px; margin: 10px; padding: 0%">
                <img src="${catalogo[i + 1].linkImagen}" class="card-img-top" alt="" style="max-width: 304px; height: 304; margin: 0 auto; padding-left: 12px; padding-right: 12px;">
                <div class="card-body" style="max-width: 304px; height: 140px; padding-left: 12px; padding-right: 12px;">
                  <h5 class="card-title">${catalogo[i + 1].nombre}</h5>
                  <p class="card-text">${catalogo[i + 1].descripcion}</p>
                </div>
                <P class="text-center" style="color:Red;">Q${catalogo[i + 1].precioConIva}</p>
                <a href="#" class="btn btn-primary agregarProductoCarrito" value="${catalogo[i + 1].id}"><i class="fas fa-cart-plus"></i></a>
                </div>
                `;
            }
    
            if(catalogo[i + 2] !== undefined)
            {
                colum.innerHTML += `
                <div class="card" style="max-width: 304px; margin: 10px; padding: 0%">
                <img src="${catalogo[i + 2].linkImagen}" class="card-img-top" alt="" style="max-width: 304px; height: 304; margin: 0 auto; padding-left: 12px; padding-right: 12px;">
                <div class="card-body" style="max-width: 304px; height: 140px; padding-left: 12px; padding-right: 12px;">
                  <h5 class="card-title">${catalogo[i + 2].nombre}</h5>
                  <p class="card-text">${catalogo[i + 2].descripcion}</p>
                </div>
                <P class="text-center" style="color:Red;">Q${catalogo[i + 2].precioConIva}</p>
                <a href="#" class="btn btn-primary agregarProductoCarrito" value="${catalogo[i + 2].id}"><i class="fas fa-cart-plus"></i></a>
                </div>
                `;
            }
    
            if(catalogo[i + 3] !== undefined)
            {
                colum.innerHTML += `
                <div class="card" style="max-width: 304px; margin: 10px; padding: 0%">
                    <img src="${catalogo[i + 3].linkImagen}" class="card-img-top" alt="" style="max-width: 304px; height: 304; margin: 0 auto; padding-left: 12px; padding-right: 12px;">
                    <div class="card-body" style="max-width: 304px; height: 140px; padding-left: 12px; padding-right: 12px;">
                      <h5 class="card-title">${catalogo[i + 3].nombre}</h5>
                      <p class="card-text">${catalogo[i + 3].descripcion}</p>
                    </div>
                    <P class="text-center" style="color:Red;">Q${catalogo[i + 3].precioConIva}</p>
                    <a href="#" class="btn btn-primary agregarProductoCarrito" value="${catalogo[i + 3].id}"><i class="fas fa-cart-plus"></i></a>
                </div>
                `;
            }
    
            i+=3;
        }
    }

    return Element;
};