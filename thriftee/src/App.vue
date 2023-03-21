<template>
  <div>
<<<<<<< HEAD
    <PersonalProfileView />
    <PersonalSettings />
    <CreateListing /><br>
    <Review /><br> 
    <ProfileReview />
=======
    <div id="nav">
      <router-link to="/"> Home </router-link> |
      <router-link to="sell"> Sell </router-link>
    </div>
    <router-view />
>>>>>>> 3af4896b52e4a009579b67111ecf599bb7bb71cb
  </div>
  
</template>

<<<<<<< HEAD
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
import PersonalSettings from './components/PersonalSettings.vue'
import PersonalProfileView from './components/PersonalProfileView.vue'
import CreateListing from './components/CreateListing.vue'
import ProfileReview from './components/ProfileReview.vue'
import Review from './components/Review.vue'
export default {
name: 'App',
components:{
  PersonalSettings,
  PersonalProfileView,
  CreateListing,
  Review,
  ProfileReview
}
}
</script>
=======
<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
#nav{
  padding : 30px
}
#nav a {
  font-weight : bold;
  color: #2c3e50
}
#nav a.router-link-exact-active{
  color: #42b983
}
</style>
>>>>>>> 3af4896b52e4a009579b67111ecf599bb7bb71cb
