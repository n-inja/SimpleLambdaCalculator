<template>
  <div>
    <div class="container">
      <h2><span>Syntax</span> <span @click="toggleSyntax">[{{syntaxButton}}]</span></h2>
      <div v-show="isOpenSyntax">
        <p>
          0: S -> L
        </p>
        <p>
          1: L -> ( λ I . L )
        </p>
        <p>
          2: L -> ( L L )
        </p>
        <p>
          3: L -> I
        </p>
        <p>
          4: I -> id
        </p>
        <p>
          id : [a-z]
        </p>
      </div>
    </div>
    <textarea v-model="input" contenteditable="true" class="editor">
    </textarea>
    <br>
    <button @click="check">
      check
    </button>
    <button @click="parse">
      parse
    </button>
    <button @click="calc">
      calc
    </button>
    <br>
    <div class="container">
      <h2>Error</h2>
      <p class="error-message">{{error}}</p>
    </div>
    <div class="container">
      <h2>Abstract Syntax Tree</h2>
      <AST :model="output" v-if="output.key"></AST>
    </div>
    <div class="container">
      <h2>Result</h2>
      <div>
        {{result}}
      </div>
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
      input: '(λx.((he)((ll)o)))',
      output: {type: '', key: 0},
      error: '',
      result: '',
      isOpenSyntax: true
    }
  },
  methods: {
    check () {
      this.error = ''
      try {
        lambda.parse(this.input)
      } catch (e) {
        this.error = e.toString()
      }
    },
    parse () {
      this.error = ''
      this.output = {type: '', key: 0}
      try {
        this.output = lambda.parse(this.input)
      } catch (e) {
        this.error = e.toString()
      }
    },
    calc () {
      this.error = ''
      this.result = this.input
      try {
        this.result += ' -> ' + lambda.calc(this.input)
      } catch (e) {
        this.error = e.toString()
      }
    },
    toggleSyntax () {
      this.isOpenSyntax = !this.isOpenSyntax
    }
  },
  components: {
    'AST': AST
  },
  computed: {
    syntaxButton () {
      return this.isOpenSyntax ? '-' : '+'
    }
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
.editor {
  background-color: #000000;
  color: #FFFFFF;
  resize: none;
  width: 80%;
  height: 16px;
}
.error-message {
  color: #FF6060;
}
.container {
  background-color: #F0F0F0;
  margin-left: 25%;
  margin-right: 25%;
}
</style>
