<template>
    <div>
        Able to access Data
        {{this.currentListing}}
    </div>
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
        this.currListingUID = this.currentListing.at(0).ListingID
    }
}
</script>

<style scoped>

</style>