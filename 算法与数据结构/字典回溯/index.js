class PrefixTreeNode {
    constructor(value) {
      this.children = {}
      this.isEnd = false
      this.value = value
    }
  }
  
  
  class PrefixTree extends PrefixTreeNode{
    constructor() {
       super(null)
    }
    addWord(str) {
      const addWordHelper = (node, str) => {
          if (!node.children[str[0]]) {
              node.children[str[0]] = new PrefixTreeNode(str[0])
              if (str.length === 1) {
                  node.children[str[0]].isEnd = true
              } 
              else if (str.length > 1) {
                  addWordHelper(node.children[str[0]], str.slice(1))
              }
          }else{
            if(str < 1) return
            addWordHelper(node.children[str[0]], str.slice(1))
          }
          
      }
      addWordHelper(this, str)
    }

    predictWord(str){
        let result = null
        const maybeWord = []
        const getLastLetterNode = function(node,processString){
            if(processString){
                if(!node.children[processString[0]]){
                    result = null
                    return
                }
                getLastLetterNode(node.children[processString[0]],processString.slice(1))              
            }else{
                result = node
            }
        }
        getLastLetterNode(this,str)


        if(result === null || result.value === null){
            return null
        }else{
            let allWords = []

            let allWordsHelper = function(stringSoFar, tree) {
              for (let k in tree.children) {
                const child = tree.children[k]
                let newString = stringSoFar + child.value
                if (child.isEnd) {
                  allWords.push(newString)
                }
                allWordsHelper(newString, child)
              }
            }
        
            let remainingTree = result
        
            if (remainingTree) {
              allWordsHelper(str, remainingTree)
            }
        
            return allWords
        }
    }
  }



  
  let test = new PrefixTree()
  test.addWord('ddasf')
  test.addWord('ddasmd')
  test.addWord('ddasmc')
  test.addWord('ddasmcfff')
  console.log(test.predictWord('dd'))
  
  
  