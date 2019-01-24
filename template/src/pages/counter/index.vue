<template>
  <div class="counter-warp">
    <p>Vuex counter：\{{ count }}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </p>
    <div @click="$router.back()" class="home">返回首页</div>
  </div>
</template>

<script>
// Use Vuex

export default {
  computed: {
    count{{#unless_eq lintConfig "airbnb"}} {{/unless_eq}}() {
      return this.$store.state.count{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  },
  methods: {
    increment{{#unless_eq lintConfig "airbnb"}} {{/unless_eq}}() {
      this.$store.commit('increment'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    },
    decrement{{#unless_eq lintConfig "airbnb"}} {{/unless_eq}}() {
      this.$store.commit('decrement'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
</script>

<style>
.counter-warp {
  text-align: center;
  margin-top: 100px;
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
