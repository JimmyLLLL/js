var addTwoNumbers = function(l1, l2) {
    var v1 = Array.prototype.slice.call(l1,0);
    var v2 = Array.prototype.slice.call(l2,0);
    var carry = 0;
    var returnArr = [];
    var maxLength;
    var diffBit = Math.abs(v1.length - v2.length);
    if(v1.length > v2.length){
        for(var k=0;k<diffBit;k++){
            v2.push(0)
        }
        maxLength = v1.length;
    }else if(v1.length < v2.length){
        for(var k=0;k<diffBit;k++){
            v1.push(0)
        }
        maxLength = l2.length;        
    }else{
        maxLength = l1.length;
    }
    for(var i = 0;i < maxLength;i++){
        if(carry){
             if((v1[i] + v2[i]+ carry) >= 10){
                returnArr[i] = (v1[i]+v2[i]+carry)-10;
            }else{
                returnArr[i] = v1[i] + v2[i] + carry;
                carry = 0;
            }           
        }else{
            if((v1[i] + v2[i]) >= 10){
                returnArr[i] = (v1[i]+v2[i])-10;
                carry = 1
            }else{
                returnArr[i] = v1[i] + v2[i];
            }
        }
    }
    if(carry){
        returnArr.push(1);
    }
    return returnArr
};

console.log(addTwoNumbers([1,1,1],[2,2,2]))