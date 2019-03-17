<template>
    <div class="dropdown">
        <a href="#" @click.prevent="showDropDown = !showDropDown" v-on-clickaway="clickAway" class="d-block text-secondary" :class="buttonClass">
            <slot name="button" />
        </a>
        
        <div v-if="showDropDown" :class="menuClass" class="dropdown-menu d-block shadow-sm">
            <slot name="menu" />
        </div>
    </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';

export default {
    name: 'MenuDropdown',

    mixins: [
        clickaway
    ],

    props: {
        buttonClass: String,
        menuClass: String
    },

    data: () => ({
        showDropDown: false
    }),

    methods: {
        clickAway() {
            if (this.showDropDown)
                this.showDropDown = false;
        },
    },
}
</script>
