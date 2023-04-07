<template>
    <div>
        Able to access Data
        {{this.currentListing}}
    </div>
</template>

<script>
export default {
    name: "ViewListing",
    data() {
        return {
            currentListing: null,
        }
    },
    async created() {
        this.currentListing = await this.$store.state.listingArray.filter((listing) => {
            return listing.ListingID === this.$route.params.listingid;
        })
    }
}
</script>

<style scoped>

</style>