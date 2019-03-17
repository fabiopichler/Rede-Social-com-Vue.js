<template>
    <div>
        <div class="card mb-2 p-3">
            <TitleWithIcon title="Publicações" icon="fas fa-paste" class="mb-3 m-0" />

            <hr>

            <nav class="posts-nav mt-3 d-flex justify-content-around font-weight-bold">
                <router-link :to="`/${user.username_alt}`" class="text-info">
                    <span><i class="fas fa-paste"></i> Todas</span>
                </router-link>

                <router-link :to="`/${user.username_alt}/tweets`" class="text-info">
                    <span><i class="fas fa-file-alt"></i> Tweets</span>
                </router-link>

                <router-link :to="`/${user.username_alt}/photos`" class="text-info">
                    <span><i class="fas fa-camera-retro"></i> Fotos</span>
                </router-link>

                <router-link :to="`/${user.username_alt}/videos`" class="text-info">
                    <span><i class="fas fa-video"></i> Vídeos</span>
                </router-link>
            </nav>
        </div>

        <TheTweetLoader
            :section="section"
            :id="user.id"
            :user="user"
        />
    </div>
</template>

<script>
import TheTweetLoader from '@/components/loaders/TheTweetLoader.vue';
import TitleWithIcon from '@/components/TitleWithIcon.vue';

export default {
    name: 'ProfileIndex',

    components: {
        TheTweetLoader,
        TitleWithIcon
    },

    props: {
        section: {
            type: String,
            required: true
        },

        user: {
            type: Object,
            required: true
        }
    },

    computed: {
        Auth() {
            return this.$store.state.Auth;
        }
    }
};
</script>

<style lang="scss">
    .posts-nav {
        .router-link-exact-active > span {
            color: #6c757d;
        }
    }
</style>
