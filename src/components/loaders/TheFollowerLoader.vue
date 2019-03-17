<template>
    <div>
        <base-loader :section="section" :id="user.id">
            <template slot-scope="{ content }">
                <div class="follower card mb-2">
                    <div :style="`background-image: url('${content.cover_alt}')`" class="ep-cover background-cover position-relative">
                        <div class="d-flex flex-column justify-content-center position-absolute text-center w-100 h-100"></div>

                        <div :style="`background-image: url('${content.avatar_alt}')`" class="ep-avatar background-cover position-absolute rounded-circle">
                            <div class="d-flex flex-column justify-content-center text-center w-100 h-100"></div>
                        </div>
                    </div>
                    
                    <div class="card-body p-3">
                        <div class="d-flex align-items-center w-100">
                            <div>
                                <router-link class="text-dark text-decoration-none" :to="`/${content.username_alt}`">
                                    <h5 class="card-title d-inline m-0 mr-1">{{ content.name }}</h5>
                                    <span class="card-text text-muted">{{ content.username_alt }}</span>
                                </router-link>
                            </div>
                            
                            <div class="flex-fill"></div>
                            
                            <ButtonFollower :user="content" />
                        </div>
                        
                        <p v-if="content.bio" class="card-text pt-2">{{ content.bio }}</p>
                    </div>
                </div>
            </template>
        </base-loader>
    </div>
</template>

<script>
import BaseLoader from './BaseLoader.vue';
import ButtonFollower from '@/components/buttons/ButtonFollower.vue';

export default {
    name: 'TheFollowerLoader',

    components: {
        BaseLoader,
        ButtonFollower
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
        contents: []
    })
}
</script>

<style lang="scss">
    .follower {
        .ep-cover {
            height: 240px;
        }

        .ep-avatar {
            width: 90px;
            height: 90px;
            border: 1px solid white;
            bottom: 15px;
            left: 15px;
        }
    }
</style>
