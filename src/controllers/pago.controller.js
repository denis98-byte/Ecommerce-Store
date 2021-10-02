import view from '../views/pago.html';

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

    on(Element, 'change', '#idMetodoPago', (e) =>{
        e.preventDefault();
   
        var metodo = Element.querySelector('#idMetodoPago');

        var dato = Element.querySelector('.RowNumber');

        if(dato != undefined){
            dato.remove();
        }

        var form = Element.querySelector('#form-metodo-Pago');
        if(metodo.value == 3){
            form.innerHTML += `
            <div id="row" class="RowNumber">
            <div class="form-group" style="width: 245px;">
                <label for="last-name">No Tarjeta</label>
                <input type="number" class="form-control" placeholder="" name="Nombre">
            </div>
            <div class="form-group" style="width: 245px;">
                <label for="last-name">CVV</label>
                <input type="number" class="form-control" placeholder="" name="Nombre">
            </div>
            <div class="form-group" style="width: 245px;">
                <label for="last-name">Fecha Vencimiento</label>
                <input type="date" class="form-control" placeholder="" name="Nombre">
            </div>
           </div>
            `;
        }
        else if(metodo.value == 1){
            form.innerHTML += `
            <div id="row" class="RowNumber">
            <div class="form-group" style="width: 245px;">
                <label for="last-name">No Referencia</label>
                <input type="number" class="form-control" placeholder="" name="Nombre">
            </div>
            <div class="form-group" style="width: 245px;">
                <label for="last-name">Monto</label>
                <input type="number" class="form-control" placeholder="" name="Nombre">
            </div>
            <div class="form-group" style="width: 245px;">
                <label for="last-name">Fecha</label>
                <input type="date" class="form-control" placeholder="" name="Nombre">
            </div>
        </div>
            `;
        }

        metodo.selectedIndex = metodo.value;
    });

    function CreateGuid() {  
        function _p8(s) {  
           var p = (Math.random().toString(16)+"000000000").substr(2,8);  
           return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;  
        }  
        return _p8() + _p8(true) + _p8(true) + _p8();  
     }  
       
     var guid = CreateGuid();  

     Element.querySelector('#idNumeroFact').value = guid;

    return Element;
};