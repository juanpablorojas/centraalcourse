
function draw(number) {
    let finalString = '';
    for(i=0; i < number; i++) {
        finalString = finalString.concat('+'.repeat(number) + '\n');
    }
    return finalString;
}

console.log(draw(6));