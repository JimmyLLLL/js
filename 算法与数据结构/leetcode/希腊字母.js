/**
 * @param {number} num
 * @return {string}
 */
var trans = function(value,level){
    var result = "";
    var main;
    var assit;
    var boss;
    console.log("your value "+value+" in "+level+" level")
    if(level==1){
        main = "V";
        assit = "I";
        boss = "X";
    }else if(level==2){
        main = "L";
        assit = "X";
        boss = "C";
    }else if(level==3){
        main = "D";
        assit = "C";
        boss = "M";
    }else if(level==4){
        assit = "M";
    }
    if(value>=1&&value<=3){
        for(var i=0;i<value;i++){
            result += assit
        }
    }else if(value==4){
        result = assit + main
    }else if(value==0){
        result = ""
    }else if(value==9){
        result = assit + boss
    }
    else{
        result = main
        for(var i=0;i<value-5;i++){
            result += assit
        }
    }

    return result;
}

var intToRoman = function(num) {
    var arr = String(num).split("");
    var numLength = arr.length;
    var finalResult = "";
    for(var k=0;k<numLength;k++){
        finalResult += trans(arr[k],numLength-k)
    }
    return finalResult
};

console.log(intToRoman(10))
console.log(intToRoman(58))
console.log(intToRoman(1994))