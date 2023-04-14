<template>
    <div>
        <ForgetPassword />
    </div>
</template>

<script>
    import ForgetPassword from '../components/ForgetPassword.vue'

    export default {
        name: "ForgetPasswordDisplay",
        components: {
            ForgetPassword,
        },
        created() {
            document.title ="Forget Password"
        }
    }
</script>