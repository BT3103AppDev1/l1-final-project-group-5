<template>
    <div>
        <!-- <CreateListing /> -->
        <!-- <LogIn /> -->
        <Display />
    </div>
</template>

<script>
import CreateListing from '../components/CreateListing.vue'
import LogIn from '../components/LogIn.vue'
import Display from '../components/Display.vue'
export default {
    name: "Sell",
    components: {
        CreateListing,
        LogIn,
        Display,
    }
}
</script>