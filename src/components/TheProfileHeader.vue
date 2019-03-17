<template>
    <div class="the-profile-header position-relative w-100 h-100 overflow-hidden">
        <div
            :style="{ backgroundImage: `url('${cover}')` }"
            id="profile-cover"
            class="d-flex flex-column justify-content-center text-center w-100 h-100 position-absolute background-cover"
        >
            <div v-if="loadingCover" class="loader text-light">
                <div class="spinner-border mb-2" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                <h5 class="text-shadow">carregando a capa</h5>
            </div>
        </div>
        
        <div class="d-flex flex-column position-absolute w-100 h-100">
            <div class="bio text-white">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-0 col-md-3 col-lg-5 col-xl-6"></div>
                        
                        <div class="col-sm-12 col-md-9 col-lg-7 col-xl-6">
                            <h5 class="text-shadow text-right">{{ user.bio }}</h5>
                        </div>
                    </div>
                </div>
            </div>

            <div class="username container mt-auto">
                <div class="row">
                    <div class="col-sm-6 col-md-4 col-lg-3 p-0 text-center" >
                        <div class="avatar">
                            <div class="mx-auto border">
                                <div :style="{ backgroundImage: `url('${user.avatar_alt}')` }" class="background-cover"></div>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-6 col-md-8 col-lg-9 col-xl-6 p-0">
                        <div class="d-flex flex-column justify-content-center h-100">
                            <router-link :to="`/${user.username_alt}`" class="text-white text-decoration-none text-shadow">
                                <h2 class="m-0 mb-1">{{ user.name }}</h2>
                                <h5 class="m-0">{{ user.username_alt }}</h5>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-6 col-md-4 col-lg-3">

                        </div>

                        <div class="col-sm-6 col-md-8 col-lg-9 col-xl-9 px-0 pr-1 d-flex justify-content-between"><!---->
                            <Navigation :items="menu" />
                        
                            <div class="d-flex flex-column justify-content-center">
                                <div v-if="Auth.check && Auth.user.id === user.id ? true : false">
                                    <button @click="editProfile = true" class="btn btn-sm btn-info rounded-pill font-weight-bold">Editar perfil</button>
                                </div>

                                <ButtonFollower
                                    v-else
                                    :user="user"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <TheEditProfileModal
            v-if="Auth.check && editProfile"
            @close="editProfile = false"
            :user="user"
        />
    </div>
</template>

<script>
import TheEditProfileModal from "@/components/modals/TheEditProfileModal.vue";
import ButtonFollower from "@/components/buttons/ButtonFollower.vue";
import Navigation from "@/components/Navigation.vue";

export default {
    name: 'TheProfileHeader',

    components: {
        TheEditProfileModal,
        ButtonFollower,
        Navigation
    },

    props: {
        user: {
            type: Object,
            required: true
        }
    },

    data: () => ({
        cover: null,
        loadingCover: true,
        editProfile: false,
        menu: null
    }),

    created() {
        const url = this.user.username_alt;

        this.menu = [
            {
                to: `/${url}`,
                text: 'Publicações',
                icon: 'fas fa-paste',
                tooltip: `<strong>Publicações</strong><br>${this.user.total_tweets}`
            }, {
                to: `/${url}/album`,
                text: 'Álbum',
                icon: 'fas fa-images',
                tooltip: '<strong>Álbum de fotos</strong>'
            }, {
                to: `/${url}/following`,
                text: 'Seguindo',
                icon: 'fas fa-user-friends',
                tooltip: `<strong>Seguindo</strong><br>${this.user.total_following}`
            }, {
                to: `/${url}/followers`,
                text: 'Seguidores',
                icon: 'fas fa-users',
                tooltip: `<strong>Seguidores</strong><br>${this.user.total_followers}`
            }
        ];
    },

    mounted() {
        this.loadBGHeader();
    },

    methods: {
        loadBGHeader() {
            let background = new Image();

            background.onload = () => {
                this.headerBackground();
                this.cover = background.src;
                this.loadingCover = false;
            };
            
            background.src = this.user.cover_alt;
        },

        headerBackground() {
            this.headerStyle = document.getElementById('profile-cover').style;
            this.headerStyleScroll();

            window.addEventListener('scroll', () => {
                this.headerStyleScroll();
            });
        },

        headerStyleScroll() {
            let s = window.scrollY;

            if (s < window.innerHeight)    
                this.headerStyle.top = (s / 4) + 'px';
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
    @import '@/assets/sass/_variables.scss';

    .the-profile-header {
        box-shadow: 0 1px 2px 1px $box-shadow-color;

        .loader > h5 {
            animation: slidein 300ms alternate infinite;
        }

        .bio {
            margin-top: 80px;
        }

        .username {
            margin-bottom: -45px;
        }

        .nav {
            .nav-link {
                line-height: 38px;
                border-top: 3px solid transparent;
                border-bottom: 3px solid transparent;

                &:hover
                {
                    border-bottom: 3px solid #444;
                }

                &:focus {
                    outline: none;
                    color: #6c757d !important;
                }

                &.router-link-exact-active {
                    border-bottom: 3px solid #6c757d;
                }
            }
        }

        .avatar {
            line-height: 0;

            > div,
            > div > div {
                display: inline-block;
                border-radius: 50%;
            }

            > div > div {
                width: 200px;
                height: 200px;
                border: 5px solid white;
            }
        }

        @keyframes slidein {
            from {
                opacity: 1;
            }

            to {
                opacity: .2;
            }
        }
    }
</style>