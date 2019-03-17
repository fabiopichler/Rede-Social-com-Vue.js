<template>
    <base-card name="subjects" title="Assuntos" titleicon="fas fa-hashtag" :height-loader="400">
        <template slot-scope="{ content }">
            <hr>

            <router-link :to="'/hashtag/' + content.tag" class="d-flex">
                <div class="text-dark font-weight-bold">{{ content.hashtag }}</div>

                <div class="flex-fill"></div>
                
                <small class="text-secondary">{{ content.n_tweets }} Tweets</small>
            </router-link>
        </template>
    </base-card>
</template>

<script>
import BaseCard from './BaseCard.vue';

export default {
    name: 'SubjectsCard',

    components: {
        BaseCard
    }
}
</script>

<style lang="scss">
    .subjects {
        line-height: 1.2rem;
    }
</style>
