
document.addEventListener("DOMContentLoaded", function(event) {


const showOperations    = document.querySelector('#show-operations');
let accumulator  = '';

    document.body.addEventListener('click', (event) => {
        if( event.target.tagName == 'SPAN' ){
            
            span = event.target.textContent;
            accumulator = `${accumulator}${span}`
            showOperations.innerHTML = accumulator;







        }
       



    });
    



});




