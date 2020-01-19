<!--结论，worker不会阻塞页面的进程，与iframe不同-->

<template>
  <div class="hello">
    <div @click="hanldeClick()">点击</div>
  </div>
</template>

<script>
import worker from './test.worker.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    hanldeClick(){
      const workerInstance = new worker();
      workerInstance.onmessage = function (event) {
          console.log('Received message ' + event.data);
      }            
      workerInstance.postMessage('start');
      setInterval(() => {
          console.log('阻塞吗')
      }, 200);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
