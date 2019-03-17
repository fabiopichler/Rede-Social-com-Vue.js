<template>
    <div>
        <HomeIndexAuth v-if="Auth.check" />
        <HomeIndexGuest v-else />
    </div>
</template>

<script>
import App from '@/MyApp.js';
import HomeIndexAuth from "./home-index/HomeIndexAuth.vue";
import HomeIndexGuest from "./home-index/HomeIndexGuest.vue";

export default {
    name: 'HomeIndex',

    components: {
        HomeIndexAuth,
        HomeIndexGuest
    },

    created() {
        App.updateTitle();
    },

    computed: {
        Auth() {
            return this.$store.state.Auth;
        }
    }
};
</script>
