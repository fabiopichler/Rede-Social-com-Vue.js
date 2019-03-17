<template>
    <the-home>
        <TheTweetLoader
            section="posts"
            id="home"
            :user="Auth.user"
        />
    </the-home>
</template>

<script>
import TheHome from "@/components/TheHome.vue";
import TheTweetLoader from '@/components/loaders/TheTweetLoader.vue';

export default {
    name: 'HomeIndexAuth',

    components: {
        TheHome,
        TheTweetLoader
    },

    computed: {
        Auth() {
            return this.$store.state.Auth;
        }
    }
};
</script>