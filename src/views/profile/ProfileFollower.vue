<template>
    <div>
        <TheSectionTitle :text="text" :user="user" />

        <TheFollowerLoader :key="section" :section="section" :user="user" :text="text" />
    </div>
</template>

<script>
import TheSectionTitle from '@/components/TheSectionTitle.vue';
import TheFollowerLoader from '@/components/loaders/TheFollowerLoader.vue';

export default {
    name: 'ProfileFollower',

    components: {
        TheSectionTitle,
        TheFollowerLoader
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

    data: () => ({
        text: null
    }),

    created() {
        this.updateText();
    },

    methods: {
        updateText() {
            if (this.section === 'following') {
                this.text = {
                    title: 'Seguindo',
                    icon: 'fas fa-user-friends',
                    desc: 'Usuários que %name% está seguindo',
                    empty: '%name% está seguindo ninguém no momento'
                };
            } else {
                this.text = {
                    title: 'Seguidores',
                    icon: 'fas fa-users',
                    desc: 'Usuários que estão seguindo %name%',
                    empty: 'Ninguém está seguindo %name% no momento'
                };
            }
        }
    },

    computed: {
        Auth() {
            return this.$store.state.Auth;
        }
    },

    watch: {
        section() {
            this.updateText();
        }
    }
};
</script>