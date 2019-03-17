<template>
    <nav class="navbar-top navbar navbar-expand-md navbar-light bg-light fixed-top">
        <div class="container">
            <router-link to="/" class="navbar-brand d-flex">
                <img src="/img/tweeter-logo-alt.svg" width="26" height="26" class="d-block mr-1" alt="">
                <span class="d-md-none d-lg-inline-block">Tweeter</span>
            </router-link>

            <button class="navbar-toggler" type="button">
                <span class="navbar-toggler-icon"></span>
            </button>

            <TheNavbarAuth v-if="Auth.check" />
            <TheNavbarGuest v-else />
        </div>
    </nav>
</template>

<script>
import TheNavbarAuth from "./TheNavbarAuth.vue";
import TheNavbarGuest from "./TheNavbarGuest.vue";

export default {
    name: 'TheNavbar',

    components: {
        TheNavbarAuth,
        TheNavbarGuest
    },

    computed: {
        Auth() {
            return this.$store.state.Auth;
        }
    }
};
</script>

<style lang="scss">
    @import '@/assets/sass/_variables.scss';

    .navbar-top {
        box-shadow: 0 1px 2px 1px $box-shadow-color;
        z-index:1025;
    }
</style>
