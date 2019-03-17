<template>
    <the-card-user-info :user="user">
        <TitleWithIcon title="Informações" icon="far fa-address-card" />
        
        <hr>
        
        <div class="user-info card-text text-secondary">
            <div v-if="user.locality">
                <i class="fas fa-globe-americas"></i> <small>{{ user.locality }}</small>
            </div>
                
            <div v-if="user.website">
                <i class="fas fa-link"></i> <small><a :href="user.website" target="_blank" class="text-info">{{ user.website | removeHttp }}</a></small>
            </div>
                
            <div v-if="user.dateBirth">
                <i class="fas fa-birthday-cake"></i> <small>Aniversário em {{ user.dateBirth }}</small>
            </div>
                
            <i class="fas fa-calendar-alt"></i> <small>Participa desde {{ user.date_reg }}</small>
        </div>
    </the-card-user-info>
</template>

<script>
import TheCardUserInfo from '@/components/TheCardUserInfo.vue';
import TitleWithIcon from '@/components/TitleWithIcon.vue';

export default {
    name: 'TheProfileCardUserInfo',

    components: {
        TheCardUserInfo,
        TitleWithIcon
    },

    props: {
        user: {
            type: Object,
            required: true
        }
    },

    filters: {
        removeHttp(url) {
            return url.replace(/^http(s?):\/\//, '');
        }
    }
}
</script>

<style lang="scss">
    .user-info-card {
        .user-info {
            line-height: 1.8rem;
        }
    }
</style>
