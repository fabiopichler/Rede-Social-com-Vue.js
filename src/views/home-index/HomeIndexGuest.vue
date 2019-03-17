<template>
    <div>
        Home
    </div>
</template>

<script>
export default {
    name: 'HomeIndexGuest',

    computed: {
        Auth() {
            return this.$store.state.Auth;
        }
    }
};
</script>