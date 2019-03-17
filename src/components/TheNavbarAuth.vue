<template>
    <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <router-link to="/" class="nav-link" title="Página inicial">
                    <span class="fas fa-home"></span> <span class="d-md-none d-lg-inline-block">Início</span>
                </router-link>
            </li>
        </ul>

        <form class="form-inline mr-3">
            <input class="form-control form-control-sm rounded-pill" type="search" placeholder="Pesquisar">
            <!--<button class="btn btn-outline-info" type="submit"><i class="fas fa-search"></i></button>-->
        </form>

        <menu-dropdown class="mr-3" button-class="" menu-class="dropdown-menu-right">
            <template slot="button">
                <div class="avatar background-cover rounded-circle" :style="`background-image: url('${Auth.user.avatar_alt}')`"></div>
            </template>

            <template slot="menu">
                <router-link :to="`/${Auth.user.username_alt}`" class="dropdown-item text-secondary">
                    <i class="fas fa-user-circle align-middle"></i> <small>Meu Perfil</small>
                </router-link>

                <router-link to="/settings" class="dropdown-item text-secondary">
                    <i class="fas fa-cog"></i> <small>Configurações</small>
                </router-link>

                <div class="dropdown-divider"></div>

                <button-logout class="dropdown-item text-secondary">
                    <span class="fas fa-sign-out-alt align-middle"></span> <small>Sair</small>
                </button-logout>
            </template>
        </menu-dropdown>

        <button class="btn btn-sm btn-info rounded-pill font-weight-bold" @click="tweetModal = true">Tweetar</button>
        <TheTweetModal v-if="tweetModal" @close="tweetModal = false" />
    </div>
</template>

<script>
import ButtonLogout from '@/components/buttons/ButtonLogout.vue';
import TheTweetModal from '@/components/modals/TheTweetModal.vue';
import MenuDropdown from '@/components/MenuDropdown.vue';

export default {
    name: 'TheNavbarAuth',

    components: {
        ButtonLogout,
        TheTweetModal,
        MenuDropdown
    },

    data: () => ({
        tweetModal: false
    }),

    computed: {
        Auth() {
            return this.$store.state.Auth;
        }
    }
};
</script>

<style lang="scss">
    .navbar-top {
        .avatar {
            width: 32px;
            height: 32px;
        }
    }
</style>
