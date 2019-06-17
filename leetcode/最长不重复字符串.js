var lengthOfLongestSubstring = function(s) {
    if(s){
        var arr = []
        for(var k=0;k<s.length;k++){
            arr[k] = new Array();
            for(var i=k;i<s.length;i++){
                if(arr[k].indexOf(s.charAt(i))===-1){
                    arr[k].push(s.charAt(i))
                }else{
                    break
                }
            }        
        }
        arr = arr.map((item)=>{
            return item.length
        })
        return Math.max.apply(null,arr);        
    }
    return 0

};

console.log(lengthOfLongestSubstring("abcabcbb"))
console.log(lengthOfLongestSubstring("pwwkew"))