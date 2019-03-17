import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        Auth: {
            loading: true,
            check: false,
            user: {}
        },

        profile: {
            user: null
        }
    },

    mutations: {
        setAuth(state, user) {
            state.Auth.check = user !== null;
            state.Auth.user = user;
            state.Auth.loading = false;
        },

        setUserProfile(state, user) {
            state.profile.user = user;
        },

        setUsername(state, username) {
            state.users.username = username;
        }
    },

    actions: {}
});
