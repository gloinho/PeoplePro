<template>
  <div id="app">
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
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">
              Cadastro de Colaborador
            </router-link>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container my-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
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
