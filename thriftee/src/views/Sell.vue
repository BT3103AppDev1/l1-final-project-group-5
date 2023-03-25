<template>
    <div>
        <ListingTemplate />
        <SignUp />
        <CreateListing />
        <LogIn />
        <Review />
    </div>
</template>

<script>
import CreateListing from '../components/CreateListing.vue'
import SignUp from '../components/SignUp.vue'
import LogIn from '../components/LogIn.vue'
import Review from '../components/Review.vue'
import ListingTemplate from '../components/ListingTemplate.vue'
export default {
    name: "Sell",
    components: {
        CreateListing,
        SignUp,
        Review,
        LogIn,
        ListingTemplate
    }
}
</script>