<template>
    <div>
        <SignUp />
    </div>
</template>

<script>
import CreateListing from '../components/CreateListing.vue'
import SignUp from '../components/SignUp.vue'
import Review from '../components/Review.vue'
import ProfileReview from '../components/ProfileReview.vue'
export default {
    name: "Sell",
    components: {
        CreateListing,
        SignUp,
        Review,
        ProfileReview
    }
}
</script>