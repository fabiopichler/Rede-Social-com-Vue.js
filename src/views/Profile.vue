<template>
    <div class="h-100">
        <TheNotFound v-if="error404" />

        <template v-else-if="!user || user.length < 1">
            <div class="d-flex flex-column justify-content-center text-center h-100">
                <span class="loading-user text-info fas fa-address-card"></span>
            </div>
        </template>

        <template v-else>
            <TheProfileHeader
                :user="user"
            />

            <the-main-grid class="mt-2">
                <template slot="main">
                    <router-view :user="user" />
                </template>

                <template slot="aside-1">
                    <TheProfileCardUserInfo :user="user" />
                </template>

                <template slot="aside-2">
                    <SuggestionsCard />
                        
                    <SubjectsCard />
                </template>
            </the-main-grid>
        </template>
    </div>
</template>

<script>
import App from '@/MyApp.js';
import TheNotFound from '@/components/TheNotFound.vue';
import TheProfileHeader from '@/components/TheProfileHeader.vue'
import TheMainGrid from '@/components/TheMainGrid.vue';
import SubjectsCard from "@/components/cards/SubjectsCard.vue";
import SuggestionsCard from "@/components/cards/SuggestionsCard.vue";
import TheProfileCardUserInfo from '@/components/TheProfileCardUserInfo.vue';

export default {
    name: 'Profile',

    components: {
        TheNotFound,
        TheProfileHeader,
        TheMainGrid,
        SubjectsCard,
        SuggestionsCard,
        TheProfileCardUserInfo
    },

    data: () => ({
        user: null,
        error404: false
    }),

    created() {
        const username = this.$route.params.username;

        if (this.Auth.check && username === this.Auth.user.username) {
            this.user = this.Auth.user;
        } else {
            this.requestUserData(username);
        }
    },

    mounted() {
        if (this.user)
            this.userLoaded();
    },

    methods: {
        userLoaded() {
            App.updateTitle(`${this.user.name} (${this.user.username_alt})`);
        },

        requestUserData(username) {
            axios.get(`/user/${username}`).then(res => {
                this.user = res.data;
                this.$store.commit('setUserProfile', this.user);
                this.userLoaded();
                
            }).catch(err => {
                console.log(err);
                this.error404 = true;
            });
        },
    },

    watch: {
        "$route.params.username"(val) {
            this.$emit('update-key', Math.random().toString(36).substr(2, 10));
        }
    },

    computed: {
        Auth() {
            return this.$store.state.Auth;
        }
    },
}
</script>

<style lang="scss">
    .loading-user {
        font-size: 5rem;
        animation: loading-user 1.5s infinite;
    }

    @keyframes loading-user {
        0% {
            opacity: 1;
            transform: scale(0);
        }

        25% {
            opacity: 1;
            transform: scale(1);
        }

        75% {
            opacity: 1;
            transform: scale(1);
        }
        
        100% {
            opacity: 0;
            transform: scale(1.5);
        }
    }
</style>

