<template>
    <div>
        <h1>Sell Page</h1>
        <CreateListing />
    </div>
</template>

<script>
import CreateListing from '../components/CreateListing.vue'
export default {
    name: "Sell",

    components: {
        CreateListing
    }
}
</script>