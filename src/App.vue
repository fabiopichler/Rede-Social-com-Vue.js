<template>
    <div class="h-100">
        <div v-if="Auth.loading">
            Carregando...
        </div>

        <template v-else>
            <TheNavbar />

            <router-view :key="key" @update-key="updateKey" />
        </template>
    </div>
</template>

<script>
import TheNavbar from "./components/TheNavbar.vue";

export default {
    name: 'App',

    components: {
        TheNavbar
    },

    data: () => ({
        key: null
    }),

    created() {
        //this.$root.$on('changePageKey', this.updateKey);
    },

    mounted() {
        axios.get('/auth').then(res => {
            this.$store.commit('setAuth', res.data);
        }).catch(err => {
            this.$store.commit('setAuth', null);
        });
    },

    methods: {
        updateKey(key) {
            this.key = key;
        }
    },

    computed: {
        Auth() {
            return this.$store.state.Auth;
        }
    },
}
</script>
