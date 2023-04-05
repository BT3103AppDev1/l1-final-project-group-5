<template>
    <div>
      <ProfileCard />
      <Deals />
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
  import Deals from '../components/Deals.vue'
  import ProfileCard from '../components/ProfileCard.vue'

  export default {
    name: 'ProfileListingDisplay',
    components:{
      Deals,
      ProfileCard
    }
  }
</script>