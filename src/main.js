import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import './main.scss';
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import { router } from './router/index.routes';
const URL = 'https://localhost:44366/api/CatalogoProductos/';

router(window.location.hash);

window.addEventListener('hashchange',() =>{
    router(window.location.hash);
});
