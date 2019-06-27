
function reverseWords(message) {
    return (message.split(' ')).reverse().join(' ');
}

function finalGrade(exam, projects) {
    if (exam > 90 || projects > 10) {
        return 100;
    }
    if (exam > 50 && projects >= 2) {
        return 75;
    }
    if (exam > 75 && projects >= 5) {
        return 90;
    }
    return 0;
}

function countDuplicates(line) {
    let duplicates = new Set();
    let uniques = new Set();
    let dup = 0;
    for (char of line) {
        if (uniques.has(char)) {
            a(uniques, duplicates, char, dup);
        } else {
            if (!duplicates.has(char)) {
                uniques.add(char);
            }
        }
    }
    console.log(uniques);
    console.log(duplicates);
    return dup;
}

const a = (uniques, duplicates, char, dup) => {
    uniques.delete(char);
    duplicates.add(char);
    return ++dup;
};

function multiply(array) {
    /*
    let ret = [];
    for(let i=0; i < array.length; i++) {
        for(let count=0; count<=i; count++) {
            ret.push(array[i]);
        }
    }
    return ret;
    */
    let result = [];
    array.forEach((element) => {
        result = [...result, ...[...new Array(element)].map(() => element)];
    });
    return result;
}

function underscore(mainString) {
    let result = [];
    if (mainString.length % 2 != 0) {
        mainString = mainString.concat('_');
    }
    for (let i = 0; i < mainString.length; i += 2) {
        //result = [...result, [...mainString.substring(i, 2+i)].join()];
        result.push(mainString.substring(i, 2 + i));
    }
    return result;
}

function multiple_split(inputString, delimiters) {
    let result = [];
    let array = inputString.split(delimiters[0]);
    array.forEach((group) => {
        delimiters.forEach((delimiter) => {
        const tmp = group.split(delimiter);
        if (tmp.length != 1) {
            result.push(tmp);
        }
            console.log(group.split(delimiter));
        });
    });
    return result;
}

function rgb(...args) {
    return args.map(color => (getHexNumber(color))).join('').toUpperCase();
}

function getHexNumber(number) {
    number = Math.floor(number);
    if (number < 0) {
        number = 0;
    } else if (number > 255) {
        number = 255;
    }
    let len = number.toString();
    return len.length <=2 ? ((number).toString(16)).padStart(2,'0') : (number).toString(16);
}

/** Drop Events */
function dropEnd(event) {
    console.log('drop');
    event.preventDefault();
    var data = event.dataTransfer.getData("text/plain");
    event.target.appendChild(document.getElementById(data));
}

function dragEfect(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move"
}

function dragStart(event) {
    console.log('arrastrando');
    event.dataTransfer.setData('text/plain', event.target.id);
}
/** */

const arrayFake = [1, 2, 3, 4];
const cadenaFake = 'abc';
const inputString = '1+2-3';
const fakeRGB = "rgb(148,0,211)"
/*
console.log(reverseWords('The greatest victory is that which requires no battle'));
console.log(finalGrade(0, 13));
console.log(countDuplicates('aarwabaahaacdaabcrw'));
console.log(multiply(arrayFake));
console.log(underscore(cadenaFake));
console.log(getHexFullColor(fakeRGB));
*/
// console.log(multiple_split(inputString, ['+', '-']));
console.log(rgb(13, 20, -14));
