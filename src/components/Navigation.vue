<template>
    <nav>
        <ul class="nav">
            <li v-for="(item, index) in items" :key="index" class="nav-item">
                <router-link :to="item.to" v-tooltip.top-center="item.tooltip" class="nav-link text text-secondary">
                    <span :class="item.icon"></span><span class="d-none d-lg-inline-block">&nbsp;{{ item.text }}</span>
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    props: {
        name: 'Navigation',

        items: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="scss">
    .nav {
        .nav-link {
            line-height: 30px;
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
</style>
