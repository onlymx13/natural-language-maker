var textArray = [];
var outputText = '';
var allIndeces = [];
var oldTextArray = [];
var twoTextArray;
var fourTextArray;
var allTextArrays;
var u = new SpeechSynthesisUtterance();
function randInt(a,b) {
return a + Math.floor((b - a + 1) * Math.random());   
}
function sentenceCase(str) {
    str = str.toLowerCase().replace(/\si\s/g, ' I ');
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

/*function extrapolateOne(text) {
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
    out = oldTextArray[1 + allIndeces[Math.floor((allIndeces.length) * Math.random())]];
    if(out !== undefined){
    outputText += out;
    }
}

function extrapolateTwo(text) {
    oldTextArray = text.toUpperCase().split(" ");
    textArray.length = oldTextArray.length - 1;
    for (var i = 0; i < oldTextArray.length - 1; i++) {
        textArray[i] = [oldTextArray[i], oldTextArray[i + 1]];
    }
    var rand = Math.floor(textArray.length * Math.random());
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
    twoTextArray = new Array(oldTextArray.length - 1);
    for (var i = 0; i < oldTextArray.length - 1; i++) {
        twoTextArray[i] = [oldTextArray[i], oldTextArray[i + 1]];
    }
    textArray.length = oldTextArray.length - 2;
    for (var i = 0; i < oldTextArray.length - 2; i++) {
        textArray[i] = [oldTextArray[i], oldTextArray[i + 1], oldTextArray[i + 2]];
    }
    var rand = Math.floor(textArray.length * Math.random());
    outputText = textArray[rand][0] + " " + textArray[rand][1] + " " + textArray[rand][2];
        i = 0;
            while (i < 3 * textArray.length) {
                i++;
                outputText += ' ';
                loopThree();
            }
            finish();
}

function extrapolateFour(text) {
oldTextArray = text.toUpperCase().split(" ");
    twoTextArray = new Array(oldTextArray.length - 1);
    for (var i = 0; i < oldTextArray.length - 1; i++) {
        twoTextArray[i] = [oldTextArray[i], oldTextArray[i + 1]];
    }
    textArray.length = oldTextArray.length - 2;
    for (var i = 0; i < oldTextArray.length - 2; i++) {
        textArray[i] = [oldTextArray[i], oldTextArray[i + 1], oldTextArray[i + 2]];
    }
fourTextArray = new Array(oldTextArray.length - 3);
    for(var i = 0; i < oldTextArray.length - 3; i++) {
        fourTextArray[i] = [oldTextArray[i], oldTextArray[i + 1], oldTextArray[i + 2], oldTextArray[i + 3]];
    }
    var rand = Math.floor(fourTextArray.length * Math.random());
    outputText = fourTextArray[rand][0]+" "+fourTextArray[rand][1]+" "+fourTextArray[rand][2]+" "+fourTextArray[rand][3];
    i = 0;
    while(i < 3 * fourTextArray.length) {
        i++;
        outputText += " ";
        loopFour();
    }
    finish();
}
*/
function extrapolateN(text,number = text.toUpperCase().split(" ").length) {
    allTextArrays=new Array(text.toUpperCase().split(" ").length);
    allTextArrays[0]=text.toUpperCase().split(" ");
    for(var arrayBeingCreated = 1; arrayBeingCreated < allTextArrays[0].length; arrayBeingCreated++) {
        allTextArrays[arrayBeingCreated] = new Array(allTextArrays[0].length - arrayBeingCreated);
        for(var pos = 0; pos < allTextArrays[0].length - arrayBeingCreated;pos++){
            allTextArrays[arrayBeingCreated][pos]=[];
            for(var addend = 0; addend < arrayBeingCreated + 1; addend++) {
                allTextArrays[arrayBeingCreated][pos] = allTextArrays[arrayBeingCreated][pos].concat(allTextArrays[0][pos + addend]);
            }
        }
    }
    var rand = Math.floor(allTextArrays[number - 1].length * Math.random());
    outputText = '';
    for(i = 0; i < number; i++) {
    outputText += allTextArrays[number - 1][rand][i]+' ';
    }
    outputText = outputText.slice(0,-1);
    i = 0;
    while(i < 3 * allTextArrays[number - 1].length) {
        i++;
        outputText += " ";
        loopN(randInt(1,allTextArrays.length - document.getElementById('slider').value));
    }
}
/*
function loopTwo() {
    allIndeces = getAllIndeces(twoTextArray, [outputText.split(" ")[outputText.split(" ").length - 3], outputText.split(" ")[outputText.split(" ").length - 2]]);
    if (!allIndeces.length) {
        loopOne();
    } else {
        var out = (twoTextArray[1 + allIndeces[Math.floor((allIndeces.length) * Math.random())]])[1];
        if (out != 'undefined'){
        outputText += out;
        }
                }
            }
function loopThree() {
    allIndeces = getAllIndeces(textArray, [outputText.split(" ")[outputText.split(" ").length - 4], outputText.split(" ")[outputText.split(" ").length - 3], outputText.split(" ")[outputText.split(" ").length - 2]]);
    if (!allIndeces.length) {
        loopTwo();
    } else {
      var out = (textArray[1 + allIndeces[Math.floor((allIndeces.length) * Math.random())]])[2];
      if (out != 'undefined'){
      outputText += out;
      }
    }
}
    
function loopFour() {
    allIndeces = getAllIndeces(fourTextArray, [outputText.split(" ")[outputText.split(" ").length - 5], outputText.split(" ")[outputText.split(" ").length - 4], outputText.split(" ")[outputText.split(" ").length - 3], outputText.split(" ")[outputText.split(" ").length - 2]]);
    if (!allIndeces.length) {
        loopThree();
    } else {
        var out = (fourTextArray[1 + allIndeces[Math.floor((allIndeces.length) * Math.random())]])[3];
        if (out != 'undefined'){
            outputText += out;
        }
    }
}
*/
function loopN(number) {
    var myArray = new Array(number);
    for(var i = 0; i < number; i++) {
        myArray[i] = outputText.split(" ")[outputText.split(" ").length - (number + 1-i)];
    }
    allIndeces = getAllIndeces(allTextArrays[number - 1], myArray);
    if (!allIndeces.length) {
        if (outputText.split(" ")[outputText.split(" ").length - 2] == allTextArrays[0][allTextArrays[0].length - 1]){
           finish(); 
        } else {
            loopN(number - 1);
        }
    } else {
        var out = (allTextArrays[number - 1][1 + allIndeces[Math.floor((allIndeces.length) * Math.random())]])[number - 1];
        if (out != 'undefined'){
            outputText += out;
        }
    }
}
function finish() {
    speak(outputText);
    document.getElementById('output').innerHTML = sentenceCase(outputText);
}
