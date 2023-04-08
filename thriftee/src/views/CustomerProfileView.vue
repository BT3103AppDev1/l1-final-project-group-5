<template>
  <div>
    <OthersProfileCard :sellerUID="seller_uid" />
    <CustomerViewProfileListing :sellerUID="seller_uid" />
  </div>
</template>


<script>
import OthersProfileCard from "../components/OthersProfileCard.vue";
import CustomerViewProfileListing from "../components/CustomerViewProfileListing.vue";

export default {
  name: "CustomerProfileView",
  components: {
    OthersProfileCard,
    CustomerViewProfileListing,
  },
  data() {
    return {
      seller_uid: null
    }
  },
  created() {
    this.seller_uid = this.$route.params.sellerid
  }
  // async created() {
  //     this.currentSeller = await this.$store.state.listingArray.filter((listing) => {
  //         return listing.ListingID === this.$route.params.listingid;
  //     })
  //     this.currListingUID = this.currentListing.at(0).ListingID
  // }
};
</script>
