<template>
    <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <router-link to="/" class="nav-link" title="Página inicial">
                    <span class="fas fa-home"></span> <span class="d-md-none d-lg-inline-block">Início</span>
                </router-link>
            </li>

            <li class="nav-item">
                <router-link to="/about" class="nav-link" title="Página inicial">
                    <span class="fas fa-info-circle"></span> <span class="d-md-none d-lg-inline-block">Sobre</span>
                </router-link>
            </li>
        </ul>

        <router-link to="/login" class="btn btn-sm btn-outline-info mr-3 rounded-pill font-weight-bold">Login</router-link>
        <router-link to="/register" class="btn btn-sm btn-info rounded-pill font-weight-bold">Registrar-se</router-link>
    </div>
</template>

<script>
export default {
    name: 'TheNavbarGuest'
}
</script>
