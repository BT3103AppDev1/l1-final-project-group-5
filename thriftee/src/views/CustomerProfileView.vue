<template>
    <div>
      <OthersProfileCard />
      <CustomerViewProfileListing />
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
    import OthersProfileCard from '../components/OthersProfileCard.vue';
    import CustomerViewProfileListing from '../components/CustomerViewProfileListing.vue'
  
    export default {
        name: 'CustomerProfileView',
        components:{
            OthersProfileCard,
            CustomerViewProfileListing,
        },
    // async created() {
    //     this.currentSeller = await this.$store.state.listingArray.filter((listing) => {
    //         return listing.ListingID === this.$route.params.listingid;
    //     })
    //     this.currListingUID = this.currentListing.at(0).ListingID
    // }
    }
  </script>

  