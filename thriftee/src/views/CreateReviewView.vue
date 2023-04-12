<template>
  <div>
    <Review :revieweeUID="revieweeID" :listingUID="listingUID" v-if="listingUID"/>
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
        revieweeID: null,
        listingUID: null
    }
  },
  created() {
    this.listingUID = this.$route.params.listingid;
    this.revieweeID = this.$route.params.revieweeid
  }
  
};
</script>
