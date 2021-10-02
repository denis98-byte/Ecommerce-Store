import view from '../views/login.html';

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

    on(Element, 'click', '#iniciar-Sesion', (e) =>{
        const formulario = Element.querySelector('#form-login-sesion');
        const form = new FormData(formulario);

        var login = {
            user     : form.get('user'),
            password : form.get('password')
        }

        if(login.user !== "") {
            window.localStorage.setItem('sesion', 'Activa');

            window.location.href = 'http://localhost:5501/#';
        }

    });

    return Element;
};