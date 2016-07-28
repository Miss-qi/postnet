'use strict';

function checkPostcodes(inputPostcodes) {
    return (/^\d{5}$/.test(inputPostcodes)) || (/^\d{5}-\d{4}$/.test(inputPostcodes));
}

function getPostcodes(inputPostcodes) {
    return inputPostcodes.replace('-', '').split('').map(function (item) {
        return item = parseInt(item);
    });
}

function getCheckcode(postcodes) {
    let sum = postcodes.reduce(function (cur, newVal) {
        return cur + newVal;
    }, 0);
    postcodes.push(10 - sum % 10);
    return postcodes;
}

function matchBarcodes(postcodesList, allBarcodes) {
    let barcodes = [];
    barcodes.push('|');
    postcodesList.map(function (i) {
        barcodes.push(allBarcodes[i]);
    });
    barcodes.push('|');
    return barcodes.join('');
}

function postcodeToBarcode(inputPostcodes) {
    let barcodes;
    if (checkPostcodes(inputPostcodes)) {
        let allBarcodes = loadAllBarcodes();
        let postcodes = getPostcodes(inputPostcodes);
        let postcodesList = getCheckcode(postcodes);
        barcodes = matchBarcodes(postcodesList, allBarcodes);
    }
    else {
        barcodes = 'input errors';
    }
    return barcodes;
}

//barcode to postcode

function checkBarcodes(input) {
    let barcodeArray = input.split(' ');
    let bar = '|';
    for (let i = 0; i < barcodeArray.length; i++) {
        return ((barcodeArray[i] === '|' || barcodeArray[i] === ':'
        || barcodeArray[i] === ' ') && barcodeArray[0] === bar
        && barcodeArray[barcodeArray.length - 1] === bar);
    }
}

function getBarcodeWithoutFrame(input) {
    let barcodeList = [];
    let result = input.split(' ');
    let temp;
    for (let i = 1; i < result.length - 1; i++) {
        barcodeList.push(result[i]);
    }
    return barcodeList;
}

function getDigits(barcodeList, allBarcodes) {
    // let digits = [];
    return barcodeList.map(function (barcode) {
        for (let i = 0; i < allBarcodes.length; i++) {
            if (barcode === allBarcodes[i]) {
                return i;
            }
        }
    });
}

function checkDigits(digits) {
    let sum = digits.reduce(function (cur, newval) {
        return cur + newval;
    });
    return sum % 10 === 0;
}

function matchPostcodes(digits) {
    let digitsString = digits.join('');
    let partOne = digitsString.substring(0, 5);
    let partTwo = digitsString.substring(5, digitsString.length - 1);
    if (digits.length > 6) {
        return partOne + '-' + partTwo;
    } else {
        return partOne;
    }
}

function barcodeToPostcode(input) {
    let isLegalInput = checkBarcodes(input);
    let postcodes;
    if (isLegalInput) {
        let barcodeList = getBarcodeWithoutFrame(input);
        let allBarcodes = loadAllBarcodes();
        let digits = getDigits(barcodeList, allBarcodes);
        let isLegalCheckcode = checkDigits(digits);
        if (isLegalCheckcode) {
            postcodes = matchPostcodes(digits);
        }
        else {
            postcodes = 'a wrong postcode';
        }
    }
    else {
        postcodes = 'a wrong input';
    }
    return postcodes;
}
