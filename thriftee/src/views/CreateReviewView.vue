<template>
  <div>
    <Review :revieweeUID="revieweeID" :listingUID="listingUID" :isBuyer="isBuyer" :v-if="listingUID"/>
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
        listingUID: null,
        isBuyer: null
    }
  },
  created() {
    this.listingUID = this.$route.params.listingid;
    this.revieweeID = this.$route.params.revieweeid;
    this.isBuyer = (this.$route.params.isbuyer === 'true');
  }
  
};
</script>
