<template>
    <base-modal wrapper-class="messagebox-wrapper" @close="$emit('close')">

    </base-modal>
</template>

<script>
import BaseModal from './BaseModal.vue';

export default {
    name: 'MessageBoxModal',

    components: {
        BaseModal
    },
}
</script>

<style lang="scss">
    .messagebox-wrapper {
        @media screen and (min-width: 576px) {
            max-width: 480px;
            max-height: 300px;
        }
    }
</style>