<template>
  <div>
<<<<<<< HEAD
<<<<<<< HEAD
    <PersonalProfileView />
    <PersonalSettings />
    <CreateListing /><br>
    <Review /><br> 
    <ProfileReview />
=======
=======
>>>>>>> 0867eb11b1c51087b0437c750714254ec4e94525
    <div id="nav">
      <router-link to="/"> Home </router-link> |
      <router-link to="sell"> Sell </router-link>
    </div>
    <router-view />
<<<<<<< HEAD
>>>>>>> 3af4896b52e4a009579b67111ecf599bb7bb71cb
=======
>>>>>>> 0867eb11b1c51087b0437c750714254ec4e94525
  </div>
  
</template>

<<<<<<< HEAD
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
>>>>>>> 0867eb11b1c51087b0437c750714254ec4e94525
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
<<<<<<< HEAD
</style>
>>>>>>> 3af4896b52e4a009579b67111ecf599bb7bb71cb
=======
</style>
>>>>>>> 0867eb11b1c51087b0437c750714254ec4e94525
