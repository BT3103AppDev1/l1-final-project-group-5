<template>
    <div>
        <!-- <CreateListing /> -->
        
        <!-- <LogIn /> -->
        <!-- <Review/>
        <ProfileReview/> -->
        <ProfileReview />
    </div>
</template>

<script>
import CreateListing from '../components/CreateListing.vue'
import LogIn from '../components/LogIn.vue'
import Review from '../components/Review.vue'
import ProfileReview from '../components/ProfileReview.vue'
export default {
    name: "Sell",
    components: {
        CreateListing,
        LogIn,
        Review,
        ProfileReview
    }
}
</script>