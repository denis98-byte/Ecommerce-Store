import Registro from './registro.controller';
import Catalogo from './catalogo.controller';
import Login   from './login.controller';
import Carrito from './carrito.controller';
import Pago    from './pago.controller';

const pages = {
    catalogo: Catalogo,
    registro: Registro,
    login: Login,
    carrito: Carrito,
    pago: Pago
}

export {pages};