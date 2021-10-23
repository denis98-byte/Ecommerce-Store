import view from '../views/login.html';



const URL = 'https://localhost:44366/api/cliente/Login/';


const loginCliente = async (login) => {
    try {
        return await fetch( URL,{ method: 'POST', body : JSON.stringify(login), headers: {"Content-type": "application/json"}})
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

    on(Element, 'click', '#iniciar-Sesion', async (e) =>{
        const formulario = Element.querySelector('#form-login-sesion');
        const form = new FormData(formulario);

        var login = {
            usuario    : form.get('user'),
            contraseña : form.get('password')
        }

        var cliente = await loginCliente(login);

        window.localStorage.setItem('loginCliente', String(JSON.stringify(cliente)));

    
        console.log(cliente.nombre);



        if(cliente.nombre !== undefined) {
            window.localStorage.setItem('sesion', 'Activa');

            window.location.href = 'http://localhost:5501/#';
        }
        else{
            alert("La contraseña o el usuario es incorrecto");
        }

    });

    return Element;
};