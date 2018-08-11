<template>
  <div id="app">
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
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
