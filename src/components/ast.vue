<template>
  <div class="top">
    <div>
      <div>
        <span>
          {{ model.type }}
        </span>
        <span @click="toggle" v-if="model.children">
          [{{pm}}]
        </span>
      </div>
    </div>
    <div v-show="isOpened && model.children" class="children">
      <div v-for="child in model.children" :key="child.key">
        <AST :model="child"></AST>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AST',
  props: {
    model: Object
  },
  data () {
    return {
      isOpened: false
    }
  },
  methods: {
    toggle () {
      this.isOpened = !this.isOpened
    }
  },
  computed: {
    pm () {
      return this.isOpened ? '-' : '+'
    }
  }
}
</script>
<style scoped>
.children {
  margin-left: 5px;
}
.top {
  text-align: left;
}
</style>
