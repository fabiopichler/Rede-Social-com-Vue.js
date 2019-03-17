<template>
    <h5 class="card-title">
        <span v-if="icon" :class="icon" class="icon-title"></span>
        {{ title }}
    </h5>
</template>

<script>
export default {
    name: 'TitleWithIcon',

    props: {
        title: {
            type: String,
            required: true
        },

        icon: {
            type: String,
            default: null
        }
    }
}
</script>

<style lang="scss" scoped>
    .icon-title {
        color:#84868f;
    }
</style>
