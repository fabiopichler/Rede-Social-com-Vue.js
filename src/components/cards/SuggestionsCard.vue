<template>
    <base-card name="suggestions" title="Sugestões" titleicon="fas fa-user-friends" :height-loader="220">
        <template slot-scope="{ content }">
            <hr>

            <user-bar :user="content">
                <ButtonFollower :auth-user-id="0" :user="content" />
            </user-bar>
        </template>
    </base-card>
</template>

<script>
import BaseCard from './BaseCard.vue';
import ButtonFollower from '@/components/buttons/ButtonFollower.vue';
import UserBar from '@/components/UserBar.vue';

export default {
    name: 'SuggestionsCard',

    components: {
        BaseCard,
        ButtonFollower,
        UserBar
    }
}
</script>

<style lang="scss">

</style>
