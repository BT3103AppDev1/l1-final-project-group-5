<template>
  <div>
    <PersonalProfileView />
  </div>
  
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #140713;
  font-size: 18px;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  
}
</style>

<script>
import PersonalProfileView from '../components/PersonalProfileView.vue'
export default {
  name: 'App',
  components:{
    PersonalProfileView
  }
}
</script>