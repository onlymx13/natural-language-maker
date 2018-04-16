var textArray = [];
var outputText = '';
var allIndeces = [];
var oldTextArray = [];
var u = new SpeechSynthesisUtterance();

function sentenceCase(str) {
    var str = str.toLowerCase().replace(/\si\s/g, ' I ');
    str = str.charAt(0).toUpperCase() + str.slice(1);
    for (i = 0; i < str.length; i++) {
        if (str.charAt(i) == ".") {
            str = str.slice(0, i + 2) + str.charAt(i + 2).toUpperCase() + str.slice(i + 3);
        }
    }
    return str;
}
window.onunload = speechSynthesis.cancel();

function getAllIndeces(arr, val) {
    var indeces = [],
        i;
    for (i = 0; i < arr.length; i++) {
        if (arr[i] === val)
            indeces.push(i);
    }
    return indeces;
}

function speak(text, callback) {
    u.text = text;
    u.lang = 'en-US';

    u.onend = function() {
        if (callback) {
            callback();
        }
    };

    u.onerror = function(e) {
        if (callback) {
            callback(e);
        }
    };

    speechSynthesis.speak(u);
}

function extrapolateOne(text) {
    textArray = text.toUpperCase().split(" ");
    outputText = textArray[Math.floor(textArray.length * Math.random())];
    textArray.push("*");
    i = 0;
    while (outputText.charAt(outputText.length - 1) != "*" && i < 3 * textArray.length) {
        i++;
        outputText += " ";
        loopOne();
    }
    finish();
}

function loopOne() {
    allIndeces = getAllIndeces(oldTextArray, outputText.split(" ")[outputText.split(" ").length - 2]);
    outputText += oldTextArray[1 + allIndeces[Math.floor((allIndeces.length) * Math.random())]];
}

function extrapolateTwo(text) {
    oldTextArray = text.toUpperCase().split(" ");
    textArray.length = oldTextArray.length - 1;
    for (var i = 0; i < oldTextArray.length - 1; i++) {
        textArray[i] = [oldTextArray[i], oldTextArray[i + 1]];
    }
    var rand = Math.floor(textArray.length * Math.random())
    outputText = textArray[rand][0] + " " + textArray[rand][1];
    textArray.push([textArray[textArray.length - 1][1], "*"]);
    i = 0;
    while (outputText.charAt(outputText.length - 1) != "*" && i < 3 * textArray.length) {
        i++;
        outputText += ' ';
        loopTwo();
    }
    finish();
}

function extrapolateThree(text) {
    oldTextArray = text.toUpperCase().split(" ");
    textArray.length = oldTextArray.length - 2;
    for (var i = 0; i < oldTextArray.length - 2; i++) {
        textArray[i] = [oldTextArray[i], oldTextArray[i + 1], oldTextArray[i + 2]];
    }
    var rand = Math.floor(textArray.length * Math.random());
    outputText = textArray[rand][0] + " " + textArray[rand][1] + " " + textArray[rand][2];
    textArray.push([textArray[textArray.length - 1][1], textArray[textArray.length - 1][2], "*"]);
    textArray.push([textArray[textArray,length - 2][2], "*", "*"]);
            i = 0;
            while (outputText.charAt(outputText.length - 1) != "*" && i < 3 * textArray.length) {
                i++;
                outputText += ' ';
                loopThree();
            }
            finish();
}

function loopTwo() {
    allIndeces = getAllIndeces(textArray, [outputText.split(" ")[outputText.split(" ").length - 3], outputText.split(" ")[outputText.split(" ").length - 2]]);
    if (!allIndeces.length) {
        loopOne();
    } else {
        if (outputText.substr(-10) == 'undefined ') {
            finish();
            throw new Error('');
        }
        outputText += (textArray[1 + allIndeces[Math.floor((allIndeces.length) * Math.random())]])[1];
                }
            }
function loopThree() {
    allIndeces = getAllIndeces(textArray, [outputText.split(" ")[outputText.split(" ").length - 4], outputText.split(" ")[outputText.split(" ").length - 3], outputText.split(" ")[outputText.split(" ").length - 2]]);
    if (!allIndeces.length) {
        loopTwo();
    } else {
        if (outputText.substr(-10) == 'undefined ') {
            finish();
            throw new Error('');
        }
        outputText += (textArray[1 + allIndeces[Math.floor((allIndeces.length) * Math.random())]])[2];
}
}
function finish() {
    speak(outputText);
    document.getElementById('output').innerHTML = sentenceCase(outputText);
}
