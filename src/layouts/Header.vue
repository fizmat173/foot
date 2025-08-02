<template>
  <header class="header">
    <nav class="nav-container">
      
      
      
      <!-- Навигационные ссылки -->
      <div class="links">
        <img src="@/assets/vecteezy.jpg" alt="Логотип" class="logo" />
        <router-link to="/">Лиги</router-link>
        <router-link to="/teams">Команды</router-link>
      </div>
      <div class="footer-text">
        Приложение для просмотра<br />
        спортивной статистики «SoccerStat»
      </div>
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

/* Флекс-контейнер для логотипа и ссылок */
.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

/* Стили для логотипа */
.logo {
  height: 48px;           
  margin-right: 1rem;     
}

.links {
  display: flex;
  align-items: center;
}

/* Стили для ссылок */
.links a {
  color: white;
  margin-right: 1.5rem;
  text-decoration: none;
  font-size: 1.15rem; 
  line-height: 1;
  display: flex;
  align-items: center; 
}

.links a.router-link-active {
  font-weight: bold;
  font-weight: 700;
  font-size: 1.2rem;
}

.footer-text {
  text-align: right;
  white-space: pre-line; 
  font-size: 0.9rem;
  line-height: 1.2;
}
</style>















<!--

<template>
  <header class="header">
    <nav class="nav-container">
      <div class="links">
        <router-link to="/">Лиги</router-link>
        
        <router-link to="/teams">Команды</router-link>
      </div>
      <div class="footer-text">
        Приложение для просмотра<br />
        спортивной статистики «SoccerStat»
      </div>
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

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.links a {
  color: white;
  margin-right: 1rem;
  text-decoration: none;
}

.links a.router-link-active {
  font-weight: bold;
}

.footer-text {
  text-align: right;
  white-space: pre-line; /* чтобы учесть перенос строки, но в данном примере мы используем br */
  font-size: 0.9rem;
  line-height: 1.2;
}
</style>
-->