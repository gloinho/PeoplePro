<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light custom-nav">
        <a class="navbar-brand" href="#">People Pro</a>
        <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>
        <div id="navbarNav" class="collapse navbar-collapse">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link class="nav-link" to="/">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/cadastro-colaborador">
                        Cadastro de Colaborador
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/cadastro-equipamento">
                        Cadastro de Equipamentos
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'AppHeader',
};
</script>
