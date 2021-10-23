import {pages} from '../controllers/pages.controller';

let root  = document.getElementById('root');

const router = async (route) => {
    root.innerHTML = '';

    switch(route) {
        case '':{
            return root.appendChild(await pages.catalogo())
        }
        case '#/registro':{
            return root.appendChild(await pages.registro())
        }
        case '#/login':{
            return root.appendChild(await pages.login())
        }
        case '#/carrito':{
            return root.appendChild(await pages.carrito())
        }
        case '#/pago':{
            return root.appendChild(await pages.pago())
        }
        case '#/factura':{
            return root.appendChild(await pages.factura())
        }
    }
};

export {router};