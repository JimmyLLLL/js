//如何判断左右小括号是否全部匹配。如 ( ( ))()((((()))))？
//意思就是有两个（（，一定有两个））
const isValid = function(s) {
    const stack = []
    const map = {
        '(' : ')',
        '[': ']',
        '{': '}'
    }
    
    for (const char of s) {
        if(char in map) { //如果有开头
            stack.push(char) //刚遇到开始的符合条件的｛（［，压进stack
        } else {
            //如果stack没有匹配到开头 或者 字符不等于开头所对应的结尾
            if( !stack.length || char !== map[stack.pop()]) {
                return false
            }
        }
    }
    //为什么不直接返回true？因为怕多一个）
    return !stack.length
};
