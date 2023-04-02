<template>
    <div>
        <CreateListing />
        <CustomersListingTemplate />
    </div>
</template>

<script>
import CreateListing from '../components/CreateListing.vue'
import CustomersListingTemplate from '../components/CustomersListingTemplate.vue'


export default {
    name: "Sell",
    components: {
        CreateListing,
        CustomersListingTemplate,
    }
}
</script>