<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <a class="navbar-brand" href="/">Vue First App</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/user" class="nav-link">Users</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <img class="vue-logo" src="./assets/logo.png">
    <br/>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
    padding: 0;
    margin: 0;
    border: 0;
}
a {
    text-decoration: none;
}

ul {
    list-style: none;
}

.clear {
    clear: both;
}
.vue-logo{
  display:table;
  margin: 30px auto;
}
#app {
  color: #2c3e50;
}
</style>
