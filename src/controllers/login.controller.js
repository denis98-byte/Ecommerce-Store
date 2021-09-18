import view from '../views/login.html';

export default () => {

    const Element = document.createElement('div');
    Element.innerHTML = view
    
    return Element;
};