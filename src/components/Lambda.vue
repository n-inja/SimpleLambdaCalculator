<template>
  <div>
    <textarea v-model="input">
    </textarea>
    <br>
    <button @click="calc">
      caluculate
    </button>
    <br>
    <div class="output">
      <AST :model="output"></AST>
    </div>
  </div>
</template>

<script>
import lambda from '@/bin/lambda'
import AST from '@/components/ast'
export default {
  name: 'HelloWorld',
  data () {
    return {
      input: 'write lambda statement here',
      output: {type: '', key: 0}
    }
  },
  methods: {
    calc () {
      this.output = lambda(this.input)
    }
  },
  components: {
    'AST': AST
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
