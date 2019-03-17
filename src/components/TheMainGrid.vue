<template>
    <div class="container">
        <div class="row">
            <main class="col-lg-8 col-xl-6 px-0 px-md-5 px-lg-1">
                <slot name="main" />
            </main>

            <aside class="col-lg-4 col-xl-3 px-0 px-md-5 px-lg-1 order-first order-lg-last order-xl-first">
                <slot name="aside-1" />

                <template v-if="windowWidth >= 992 && windowWidth < 1200">
                    <slot name="aside-2" />
                </template>
            </aside>

            <aside v-if="windowWidth >= 1200" class="col-xl-3 px-1">
                <slot name="aside-2" />
            </aside>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TheMainGrid',

    data: () => ({
        windowWidth: window.innerWidth
    }),

    mounted() {
        window.addEventListener('resize', this.handleResize);
    },

    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },

    methods: {
        handleResize(e) {
            this.windowWidth = window.innerWidth;
        }
    }
}
</script>
