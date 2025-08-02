<!-- <template>
  <footer
    class="footer"
  >
    <p>&copy; 2024 Foot Project. All rights reserved.</p>
  </footer>
</template>

<script>
  export default {
    name: 'AppFooter',
  }
</script>

<style scoped>
.footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 1rem;
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style> -->

<template>
  <footer class="footer">
    <nav class="footer-nav">
      <router-link to="/">Лиги</router-link>
      <router-link to="/teams">Команды</router-link>
    </nav>
    <div class="footer-info">
      <p>&copy; 2024 Foot Project. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
}
</script>

<style scoped>
.footer {
  background: #333;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-nav a {
  color: white;
  margin-right: 1rem;
  text-decoration: none;
}

.footer-nav a.router-link-active {
  font-weight: bold;
}

.footer-info p {
  margin: 0;
  font-size: 0.9rem;
}
</style>