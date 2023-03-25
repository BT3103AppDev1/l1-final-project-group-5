<template>
  <div>
    <div id="nav">
      <router-link to="/"> Home </router-link> |
      <router-link to="sell"> Sell </router-link>
    </div>
    <hr>
    <router-view />
  </div>
  
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
} 

</style>
