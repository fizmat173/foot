<template>
  <header class="header">
    <nav>
      <router-link to="/">Главная</router-link>
      <router-link to="/matches">Матчи</router-link>
      <router-link to="/teams">Команды</router-link>
    </nav>
  </header>
</template>

<script>
  export default {
    name: 'AppHeader',
  }
</script>

<style scoped>
.header {
  background: #333;
  color: white;
  padding: 1rem;
}

nav a {
  color: white;
  margin-right: 1rem;
  text-decoration: none;
}

nav a.router-link-active {
  font-weight: bold;
}
</style>
