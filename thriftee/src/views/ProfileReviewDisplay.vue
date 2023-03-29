<template>
    <div>
        <ProfileCard />
        <PersonalProfileReviews />
    </div>
</template>

<script>
    import ProfileCard from '../components/ProfileCard.vue'
    import PersonalProfileReviews from '../components/PersonalProfileReviews.vue'
    export default {
        name: "ProfileReviewDisplay",
        components: {
            PersonalProfileReviews,
            ProfileCard
        }
    }
</script>