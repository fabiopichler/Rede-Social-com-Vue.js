<template>
    <div class="card mb-2">
        <div class="card-body p-3">
            <TitleWithIcon :title="title" :icon="titleicon" />

            <div v-if="contents.length < 1" class="d-flex flex-column" :style="{ height: `${heightLoader}px` }">
                <hr class="w-100 m-1">
                
                <div class="spinner-border text-secondary m-auto" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>

            <div v-for="content in contents" :key="content.id" :class="name">
                <slot :content="content"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import TitleWithIcon from '@/components/TitleWithIcon.vue';

export default {
    name: 'BaseCard',

    components: {
        TitleWithIcon
    },

    props: {
        name: {
            type: String,
            required: true
        },

        title: {
            type: String,
            required: true
        },

        titleicon: {
            type: String,
            required: true
        },

        heightLoader: {
            type: Number,
            default: 100
        }
    },

    data: () => ({
        contents: []
    }),

    created() {
        axios.get(`/card/${this.name}`).then(res => {
            this.contents = res.data;
        });
    }
}
</script>
