<template>
    <div class="home">
        <the-main-grid>
            <template slot="main">
                <slot />
            </template>

            <template slot="aside-1">
                <the-card-user-info v-if="Auth.check" :user="Auth.user">
                    <UserBar :user="Auth.user" />
                </the-card-user-info>

                <SubjectsCard />
            </template>

            <template slot="aside-2">
                <SuggestionsCard />
            </template>
        </the-main-grid>
    </div>
</template>

<script>
import TheMainGrid from '@/components/TheMainGrid.vue';
import SubjectsCard from "@/components/cards/SubjectsCard.vue";
import SuggestionsCard from "@/components/cards/SuggestionsCard.vue";
import TheCardUserInfo from '@/components/TheCardUserInfo.vue';
import UserBar from '@/components/UserBar.vue';

export default {
    name: 'TheHome',

    components: {
        TheMainGrid,
        SubjectsCard,
        SuggestionsCard,
        TheCardUserInfo,
        UserBar
    },

    computed: {
        Auth() {
            return this.$store.state.Auth;
        }
    }
};
</script>

<style lang="scss">
    .home {
        margin-top: 62px;
    }
</style>
