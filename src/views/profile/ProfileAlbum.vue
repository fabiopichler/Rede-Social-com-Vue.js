<template>
    <div>
        <TheSectionTitle :text="text" :user="user" />

        <TheAlbumLoader :id="user.id" />
    </div>
</template>

<script>
import TheSectionTitle from '@/components/TheSectionTitle.vue';
import TheAlbumLoader from '@/components/loaders/TheAlbumLoader.vue';

export default {
    name: 'ProfileAlbum',

    components: {
        TheSectionTitle,
        TheAlbumLoader
    },

    props: {
        user: {
            type: Object,
            required: true
        }
    },

    data: () => ({
        text: null
    }),

    created() {
        this.text = {
            title: 'Álbum de fotos & vídeos',
            icon: 'fas fa-images',
            desc: 'Álbum com todas as fotos e vídeos de %name%',
            empty: '%name% está seguindo ninguém no momento'
        };
    },

    computed: {
        Auth() {
            return this.$store.state.Auth;
        }
    }
};
</script>