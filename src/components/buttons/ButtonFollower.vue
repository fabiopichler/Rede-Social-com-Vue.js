<template>
    <div>
        <button v-if="!Auth.check" :class="classes" class="btn-outline-info">Seguir</button>

        <router-link v-else-if="Auth.user.id == user.id" :to="`/${user.username_alt}`" :class="classes" class="btn-outline-warning">Meu perfil</router-link>

        <button v-else-if="loading" :class="classes" class="btn-info" disabled>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        </button>

        <button v-else-if="is_following" @click="unfollow()" @mouseover="textUnfollow()" @mouseleave="textFollowing()"
            :class="`${classes} ${unfollowClass}`">{{ text }}</button>
        
        <button v-else @click="follow()" :class="classes" class="btn-outline-info">Seguir</button>
    </div>
</template>

<script>
export default {
    name: 'ButtonFollower',

    props: {
        user: {
            type: Object,
            required: true
        }
    },

    data: () => ({
        is_following: false,
        loading: false,
        text: 'Seguindo',
        unfollowClass: 'btn-info'
    }),

    created() {
        this.is_following = (this.user.is_following == 1);
    },

    methods: {
        follow() {
            this.loading = true;

            axios.post('/follow', { id: this.user.id }).then(res => {
                this.updateButton('follow', res.data);
            });
        },

        unfollow() {
            this.loading = true;

            axios.delete('/follow', { params: { id: this.user.id } }).then(res => {
                this.updateButton('unfollow', res.data);
            });
        },

        updateButton(action, data) {
            this.loading = false;

            if (data != undefined && data.status == 'success')
                this.is_following = (action == 'follow');
        },

        textFollowing() {
            this.text = 'Seguindo';
            this.unfollowClass = 'btn-info';
        },

        textUnfollow() {
            this.text = 'Deixar de seguir';
            this.unfollowClass = 'btn-danger';
        }
    },

    computed: {
        classes() {
            return 'btn btn-sm rounded-pill font-weight-bold';
        },

        Auth() {
            return this.$store.state.Auth;
        }
    }
}
</script>

