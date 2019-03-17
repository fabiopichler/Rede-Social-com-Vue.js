<template>
    <button @click="logout()">
        <slot />
    </button>
</template>

<script>
export default {
    name: 'ButtonLogout',

    methods: {
        logout() {
            axios.post('/auth/logout').then(res => {
                window.location.href = '/';
            }).catch(err => {
                console.log(err);
            });
        }
    }
}
</script>

