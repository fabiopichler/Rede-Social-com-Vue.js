<template>
    <div class="album">
        <base-loader section="album" :id="id" class-container="grid card mb-2" class-v-for="cell">
            <template slot-scope="{ content }">
                <div class="m-0 content">
                    <template v-if="content.type == 'photo'">
                        <div class="background-cover" :style="`background-image: url('${content.url}')`"></div>
                    </template>

                    <template v-else-if="content.type == 'video'">
                        <div class="background-cover d-flex flex-column justify-content-center text-center h-100"
                            :style="`background-image: url('${$options.filters.getImage(content.url)}')`">
                            <span class="fas fa-video"></span>
                        </div>
                    </template>
                </div>
            </template>
        </base-loader>
    </div>
</template>

<script>
import BaseLoader from './BaseLoader.vue';

export default {
    name: 'TheAlbumLoader',

    components: {
        BaseLoader
    },

    props: {
        id: {
            type: String,
            required: true
        },
    },

    data: () => ({
        contents: []
    }),

    filters: {
        getImage(url) {
            return url.replace(/.*\/([a-z0-9\-_]+)$/i, 'http://img.youtube.com/vi/$1/mqdefault.jpg');
        }
    }
}
</script>

<style lang="scss">
    $grid-padding: 5px;

    .album {
        .grid {
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            padding: $grid-padding 0 0 $grid-padding;
        }

        .cell {
            width: 50%;
            padding: 0 $grid-padding $grid-padding 0;

            @media screen and (min-width: 460px) {
                width: calc(100% / 3);
            }
        }

        .content {
            position: relative;
            width: 100%;
            overflow: hidden;

            &:after {
                content: "";
                display: block;
                padding-bottom: 100%;
            }

            > div {
                position: absolute;
                width: 100%;
                height: 100%;
                cursor: pointer;
                transition: transform 350ms;

                > span {
                    font-size: 3rem;
                    color: rgba(200,200,200,.4);
                    transition: color 350ms;
                }

                &:hover {
                    transform: scale(1.2);

                    > span {
                        color: rgba(255,255,255,.6);
                    }
                }
            }
        }
    }
</style>
