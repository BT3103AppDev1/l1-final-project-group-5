<template>
    <customers-listing-template :listingUID="currListingUID" v-if="currListingUID !== ''"/>
</template>

<script>
import CustomersListingTemplate from '../components/CustomersListingTemplate.vue'

export default {
    name: "ViewListing",
    components: {
        CustomersListingTemplate
    },
    data() {
        return {
            currentListing: null,
            currListingUID: ""
        }
    },
    async created() {
        this.currentListing = await this.$store.state.listingArray.filter((listing) => {
            return listing.ListingID === this.$route.params.listingid;
        })
        console.log(this.$route.params.listingid);
        this.currListingUID = this.$route.params.listingid;
    }
}
</script>
