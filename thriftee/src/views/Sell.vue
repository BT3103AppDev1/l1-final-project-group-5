<template>
    <div>
        <!-- <CreateListing /> -->
        <LogIn />
    </div>
</template>

<script>
import CreateListing from '../components/CreateListing.vue'
import LogIn from '../components/LogIn.vue'
export default {
    name: "Sell",

    components: {
        CreateListing,
        LogIn
    }
}
</script>