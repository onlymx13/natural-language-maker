var textArray;
var outputText;
var allIndeces;
function sentenceCase(str){
	var str = str.toLowerCase().replace(/\si\s/g, ' I ');
	str = str.replace(/ ti/g, ' TI');
	str = str.replace(/ ram/g, ' RAM');
	str = str.replace(/ plus silver edition/g, ' Plus Silver Edition');
	str=str.charAt(0).toUpperCase()+str.slice(1);
	for(i=0;i<str.length;i++){
	if(str.charAt(i)=="."){
	str=str.slice(0,i+2)+str.charAt(i+2).toUpperCase()+str.slice(i+3);
	}
	}
	return str;
}
function getAllIndeces(arr, val) {
    var indeces = [], i;
    for(i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indeces.push(i);
    return indeces;
}
String.prototype.addSpace=function(){return this+" ";}
function makeText(text){
textArray=text.toUpperCase().split(" ");
outputText=textArray[Math.floor(textArray.length*Math.random())];
textArray.push("*");
i=0;
while(outputText.charAt(outputText.length-1)!="*" && i<3*textArray.length) {
i++;
console.log('in loop');
outputText=outputText.addSpace();
allIndeces = getAllIndeces(textArray,outputText.split(" ")[outputText.split(" ").length-2]);
outputText=outputText+textArray[1+allIndeces[Math.floor((allIndeces.length)*Math.random())]];
}
console.log('out of loop')
document.getElementById('output').innerHTML=sentenceCase(outputText);
}
