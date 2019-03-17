<template>
    <div class="user-bar d-flex w-100 align-items-center">
        <div :style="{ backgroundImage: `url('${user.avatar_alt}')` }" class="b-avatar background-cover mr-2 rounded-circle"></div>

        <router-link :to="`/${user.username_alt}`" class="b-user-link text-dark text-decoration-none display-block">
            <h6 class="mb-0">{{ user.name }}</h6>
            <small class="text-secondary">{{ user.username_alt }}</small>
        </router-link>

        <div class="flex-fill"></div>

        <slot />
    </div>
</template>

<script>
export default {
    name: 'UserBar',

    props: {
        user: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="scss">
    .user-bar {
        .b-avatar {
            width: 42px;
            height: 42px;
        }

        .b-user-link {
            line-height: 1.2rem;

            > h6 {
                font-size: 0.95rem;
            }
        }
    }
</style>
