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
                <li
                    v-for="route in appRoutes"
                    :key="route.path"
                    class="nav-item"
                >
                    <router-link class="nav-link" :to="route.path">{{
                        route.name
                    }}</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import appRoutes from '../appRoutes';
import startCase from 'lodash/startCase';
export default {
    name: 'AppHeader',
    data() {
        return {
            appRoutes: [],
        };
    },
    created() {
        this.appRoutes = appRoutes.map((route) => {
            return {
                ...route,
                name: startCase(route.name),
            };
        });
    },
};
</script>
