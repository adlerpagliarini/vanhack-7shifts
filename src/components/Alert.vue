<template>
  <div class="alert alert-warning alert-dismissible" role="alert">
  <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-on:click="resetAlert()">
    <span aria-hidden="true">&times;</span>
  </button>
    {{message}}
</div>
</template>

<script>
export default {
  name: 'alert',
  //props: ['message'],
  props: {
    message:{
      type: String,
      default: ''
    }
  },
  data () {
    return {
      
    }
  },
  methods:{
    resetAlert(){
      this.default = '';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>