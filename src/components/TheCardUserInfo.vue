<template>
    <div class="user-info-card card mb-2">
        <div class="card-body p-3">
            <slot />

            <hr>

            <div class="info d-flex d-flex-collum justify-content-around text-secondary text-center font-weight-bold">
                <div>
                    <small>Tweets:</small><br>
                    {{ user.total_tweets }}
                </div>

                <div>
                    <small>Seguindo:</small><br>
                    {{ user.total_following }}
                </div>

                <div>
                    <small>Seguidores:</small><br>
                    {{ user.total_followers }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TheCardUserInfo',

    props: {
        user: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="scss">
    .user-info-card {
        .info {
            line-height:1.6rem;
        }
    }
</style>
