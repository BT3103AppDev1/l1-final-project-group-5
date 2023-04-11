<template> 
    <div>
        <EditListing :listingUID="listingUID" v-if="listingUID"/>
    </div>
</template>

<script>
    import EditListing from "../components/EditListing.vue";

    export default {
        name: "EditListingView",
        componenets: {
            EditListing
        },
        data() {
            return {
                listingUID: null
            }
        }, 
        created() {
            this.listingUID = this.$route.params.listingid;
        }
    }
</script>
