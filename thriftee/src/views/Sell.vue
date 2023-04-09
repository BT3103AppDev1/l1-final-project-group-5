<template>
    <div>
        <CreateListing />
        <CustomersListingTemplate />
        <Review />
    </div>
</template>

<script>
import CreateListing from '../components/CreateListing.vue'
import CustomersListingTemplate from '../components/CustomersListingTemplate.vue'
import Review from '../components/Review.vue'
export default {
    name: "Sell",
    components: {
        CreateListing,
        CustomersListingTemplate,
        Review
    }
}
</script>