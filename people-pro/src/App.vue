<template>
    <div id="app">
        <AppHeader />
        <div class="container my-4">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'

export default {
  name: 'App',
  components:{
    AppHeader
  }
};
</script>

<style>
.custom-nav {
    background: linear-gradient(to right, #007bff, #1c8eff);
}

.navbar-brand {
    color: #fff;
}

.container {
    max-width: 960px;
    margin: 0 auto;
    padding: 0 15px;
}

@media (min-width: 768px) {
    .container {
        padding: 0;
    }
}
</style>
