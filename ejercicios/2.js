
function leapYear(year) {
    if (year % 4 == 0) {
        if (year % 100 == 0) {
            if (year % 400 == 0) {
                return true;
            }
            return false;
        }
        return true;
    } else {
        return false;
    }
}

function cpm(section1, section2) {
    const a = section1.split('.').map((item) => parseInt(item));
    const b = section2.split('.').map((item) => parseInt(item));
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
        const aO = a[i] || 0;
        const bO = b[i] || 0;
        if (aO > bO) {
            return 1;
        } else if (bO > aO) {
            return -1;
        }
    }
    return 0;/*
    let arr1 = section1.split`.`, arr2 = section2.split`.`
    for (let i = 0; i < Math.max(arr1.length,arr2.length); i++){
      if (!arr1[i] && +arr2[i] > 0) return -1
      if (!arr2[i]  && +arr1[i] > 0) return 1
      if (+arr1[i] < +arr2[i]) return -1
      if (+arr1[i] > +arr2[i]) return 1
    }
    return 0*/
}

function posAverage(sGroup) {
    const primaryArray = sGroup.replace(/[ ]/g,'').split(',');
    const count = primaryArray.length;
    percent = 0;
    for (let i = 0; i<count; i++) {
        for (let j = i+1; j<count; j++) {
            percent+=comparar(primaryArray[i], primaryArray[j]);
        }
    }
    return percent/(count*(count-1)/2);
}

function comparar(val1, val2) {
    let oc = 0;
    const stringLength = val1.length;
    for (let x = 0; x<stringLength; x++) {
        if (parseInt(val1[x]) === parseInt(val2[x])) {
            oc+=1;
        }
    }
    return (oc * 100)/stringLength;
}

const x = "466960,069060,494940,060069,060090,640009,496464,606900,004000,944096";
const s2 ="444996,699990,666690,096904,600644,640646,606469,409694,666094,606490";
const s = "6900690040,4690606946,9990494604";
const test = "466960, 069060, 494940, 060069, 060090, 640009, 496464, 606900, 004000, 944096";
console.log(leapYear(1100));
console.log(cpm("3.0.1", "3.1"));
console.log(posAverage(test));
