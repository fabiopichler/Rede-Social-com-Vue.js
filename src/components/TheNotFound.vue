<template>
    <div class="d-flex flex-column h-100 text-center">
        <div class="error404 m-auto">
            <i class="icon text-danger mb-5 fas fa-exclamation-triangle"></i>

            <h3 class="mb-3">Página não encontrada</h3>

            <h5 class="mb-5">O link que você seguiu pode estar quebrado ou a página pode ter sido removida.</h5>

            <div>
                <a href="#" @click.prevent="$router.go(-1)">Voltar à página anterior</a> |
                
                <router-link to="/">Ir à página inicial</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import App from '@/MyApp.js';

export default {
    name: 'TheNotFound',

    created() {
        App.updateTitle('Página não encontrada');
    }
}
</script>

<style lang="scss">
    .error404 {
         > .icon {
            font-size: 5rem;
        }
    }
</style>

