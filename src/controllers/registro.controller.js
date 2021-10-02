import view from '../views/registar.html';

const URL = 'https://localhost:44366/api/Cliente/';


const createCliente = async (cliente) => {
    try {
        return await fetch( URL,{ method: 'POST', body : JSON.stringify(cliente), headers: {"Content-type": "application/json"}})
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

    on(Element, 'click', '#search', async (e) =>{
        const formulario = Element.querySelector('#form-registro-cliente');
        const form = new FormData(formulario);

        var cliente = {
            nombre        : form.get('nombre'),
            apellido      : form.get('apellido'),
            telefono      : form.get('telefono'),
            correo        : form.get('correo'),
            direccion     : form.get('direccion'),
            nit           : form.get('nit'),
            usuario       : form.get('usuario'),
            contraseña    : form.get('contraseña'),
            idTipoCliente : parseInt(form.get('tipoCliente')),
        }

        var response = await createCliente(cliente);

        window.location.href = 'http://localhost:5501/#/login';
    });
    
    return Element;
};