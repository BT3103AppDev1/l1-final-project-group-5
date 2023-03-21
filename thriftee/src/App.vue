<template>
  <div>
    <PersonalProfileView />
    <PersonalSettings />
    <CreateListing /><br>
    <Review /><br> 
    <ProfileReview />
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