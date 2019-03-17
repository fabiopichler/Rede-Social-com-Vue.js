import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const profileRoutes = [
    'profile',
    'tweets',
    'photos',
    'videos'
]

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,

    scrollBehavior(to, from, savedPosition) {
        if (profileRoutes.indexOf(from.name) === -1
                || profileRoutes.indexOf(to.name) === -1) {
            return { x: 0, y: 0 };

        } else if (savedPosition) {
            return savedPosition;
        }
    },
    
    routes: [{
        path: "/",
        name: "home",
        component: () => import('./views/HomeIndex.vue')
    }, {
        path: "/about",
        name: "about",
        component: () => import('./views/About.vue')
    }, {
        path: "/login",
        name: "login",
        component: () => import('./views/auth/Login.vue')
    }, {
        path: "/register",
        name: "register",
        //component: () => import('./views/auth/Register.vue')
    }, {
        path: "/@:username",
        component: () => import('./views/Profile.vue'),

        children: [{
            path: '/',
            name: "profile",
            props: { section: 'posts/all' },
            component: () => import('./views/profile/ProfileIndex.vue')
        }, {
            path: 'tweets',
            name: "tweets",
            props: { section: 'posts/tweet' },
            component: () => import('./views/profile/ProfileIndex.vue')
        }, {
            path: 'photos',
            name: "photos",
            props: { section: 'posts/photo' },
            component: () => import('./views/profile/ProfileIndex.vue')
        }, {
            path: 'videos',
            name: "videos",
            props: { section: 'posts/video' },
            component: () => import('./views/profile/ProfileIndex.vue')
        }, {
            path: 'album',
            name: "album",
            props: { },
            component: () => import('./views/profile/ProfileAlbum.vue')
        }, {
            path: 'following',
            name: "following",
            props: { section: 'following' },
            component: () => import('./views/profile/ProfileFollower.vue')
        }, {
            path: 'followers',
            name: "followers",
            props: { section: 'followers' },
            component: () => import('./views/profile/ProfileFollower.vue')
        }]
    }, {
        path: '*',
        component: () => import('./views/NotFound.vue')
    }]
});
