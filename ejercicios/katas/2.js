
function persistance(initNumber) {
    const array = (initNumber+'').split('');
    console.log(array.reduce((valorAnterior, valorActual, indice, vactor) => {
        return parseInt(valorAnterior) + parseInt(valorActual);
    }));
}


persistance(999);