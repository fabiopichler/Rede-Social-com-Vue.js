<template>
    <div>
        <base-loader :section="section" :id="id" ref="loader">
            <template slot-scope="{ content, deleteRow }">
                <div :class="`tweet card mb-2`">
                    <div class="card-header py-2 px-3">
                        <user-bar :user="getUser(content)">
                            <small class="text-muted">{{ content.date_posted }}</small>

                            <menu-dropdown class="ml-1" button-class="px-2 py-1" menu-class="dropdown-menu-right">
                                <template slot="button">
                                    <i class="fas fa-ellipsis-h"></i>
                                </template>

                                <template slot="menu">
                                    <button @click="copyLink(content.id)" class="dropdown-item text-secondary">
                                        <i class="fas fa-link"></i> <small>Copiar link do Tweet</small>
                                    </button>
                                    
                                    <template v-if="content.user_id == (Auth.check ? Auth.user.id : 0)">
                                        <div class="dropdown-divider"></div>
                                        
                                        <button class="dropdown-item text-secondary" @click="deleteRow('/tweet', content.id)">
                                            <i class="fas fa-trash-alt"></i> <small>Excluir Tweet</small>
                                        </button>
                                    </template>
                                </template>
                            </menu-dropdown>
                        </user-bar>
                    </div>

                    <template v-if="content.content">
                        <div class="card-body px-3 pt-0 pb-2">
                            <p class="card-text" v-html="$options.filters.addHashtag(content.content)"></p>
                        </div>
                    </template>

                    <template v-if="content.type == 'photo'">
                        <hr>

                        <figure class="tweet-photo d-block m-0">
                            <img class="w-100 background-cover" :src="content.url">
                        </figure>
                    </template>

                    <template v-else-if="content.type == 'video'">
                        <hr>

                        <div class="embed-responsive embed-responsive-16by9">
                            <iframe class="embed-responsive-item background-cover" :src="content.url" allowfullscreen></iframe>
                        </div>
                    </template>

                    <div class="card-footer">
                        <div class="text-secondary text-center">
                            <i class="far fa-comments mr-5"></i>
                            <i class="fas fa-retweet mr-5"></i>
                            <i class="far fa-heart"></i>
                        </div>
                    </div>
                </div>
            </template>
        </base-loader>
    </div>
</template>

<script>
import BaseLoader from './BaseLoader.vue';
import UserBar from '@/components/UserBar.vue';
import MenuDropdown from '@/components/MenuDropdown.vue';

export default {
    name: 'TheTweetLoader',

    components: {
        BaseLoader,
        UserBar,
        MenuDropdown
    },

    props: {
        section: {
            type: String,
            required: true
        },

        id: {
            type: String,
            required: true
        },

        user: {
            type: Object,
            required: true
        }
    },

    data: () => ({
        contents: [],
        loaded: false
    }),

    methods: {
        getUser(content) {
            return content.user == undefined ? this.user : content.user[0];
        },

        copyLink(id) {
            this.$copyText(`/tweet/${id}`).then((e) => {
            }, (e) => {
                console.log(e);
            });
        }
    },

    filters: {
        addHashtag(content) {
            return content.replace(/#([a-z0-9_]{1,30})/ig, '<a href="/hashtag/$1" class="text-info font-weight-bold">#$1</a>');
        }
    },
    
    computed: {
        Auth() {
            return this.$store.state.Auth;
        }
    },

    watch: {
        section(value) {
            this.$refs.loader.load(value);
        }
    }
}
</script>


<style lang="scss">
    @import '@/assets/sass/_variables.scss';

    .tweet-menu {
        box-shadow: 1px 1px 2px 1px $box-shadow-color;
    }

    .tweet {
        > .card-header {
            border: none;
        }
    }
</style>
