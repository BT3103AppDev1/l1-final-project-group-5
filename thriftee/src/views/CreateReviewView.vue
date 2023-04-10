<template>
  <div>
    <Review :isBuyer="isBuyer" :listingUID="listingUID" v-if="listingUID"/>
  </div>
</template>


<script>
import Review from '../components/Review.vue';


export default {
  name: "CustomerProfileView",
  components: {
    Review
  },
  data() {
    return {
        isBuyer: null,
        listingUID: null
    }
  },
  created() {
    this.listingUID = this.$route.params.listingid;
    if (this.$route.params.isbuyer === 'true') {
        this.isBuyer = true;
    } else {
        this.isBuyer = false;
    }
  }
  
};
</script>
