<template>
  <div id = "container">
    <div id="nav" v-if="user && $route.name !== 'SignUpDisplay' && $route.name !== 'LogInDisplay' && $route.name !== 'ForgetPasswordDisplay'">
      <router-link to="explore" class="routerlink" style="margin-right: 1vw;"> Explore </router-link> |
      <router-link to="profilelistings" class="routerlink" style="margin-right: 1vw;"> Profile </router-link> |
      <router-link to="sell" class="routerlink"> Sell </router-link> 
    </div>
    <router-view />
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default {
  data() {
    return {
      user: false
    }
  },

  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        this.user = user;
        // if (user) {
        //   this.$router.push({name: "ProfileListings"})
        // }
    });
    this.$store.dispatch("getListings");
  }
}
</script>

<style scoped>
#app {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
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

.logo {
  display: block;
  margin: 0 auto 2rem;
}
.routerlink {
  color: rgba(76, 0, 0, 0.832);
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-size: 26px;
  font-style: italic;
  margin-left: 1vw;
  border-bottom: 2px solid  rgba(76, 0, 0, 0.832);
  
}

.routerlink:hover {
  color: rgb(156, 130, 154);
  border-bottom: 2px solid   rgb(156, 130, 154);
}

a { text-decoration: none; }
  

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
} 

#container {
  margin-top: 3vh;
  font-weight: bold;

}

hr {
    height: 1px;
    width: 500px;
    margin: auto;
    margin-top: 20px;
    background-color: black;
}

#nav a.router-link-exact-active{
  color: #d3b1c7
}
</style>
