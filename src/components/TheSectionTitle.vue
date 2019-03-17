<template>
    <div class="card mb-2 p-3">
        <TitleWithIcon :title="text.title" :icon="text.icon" class="mb-3 m-0" />

        <hr class="mb-3">

        <div>{{ text.desc | message(user, 'name') }}</div>
    </div>
</template>

<script>
import TitleWithIcon from '@/components/TitleWithIcon.vue';

export default {
    name: 'TheSectionTitle',

    components: {
        TitleWithIcon
    },

    props: {
        text: {
            type: Object,
            required: true
        },

        user: {
            type: Object,
            required: true
        }
    },

    filters: {
        message(text, user, arg) {
            return text.replace(new RegExp(`%${arg}%`), user[arg]);
        }
    }
}
</script>
