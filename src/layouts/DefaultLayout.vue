<template>
  <div class="layout">
    <AppHeader />
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script>
  import AppHeader from './Header.vue'
  import AppFooter from './Footer.vue'

  export default {
    name: 'DefaultLayout',
    components: { AppHeader, AppFooter },
  }
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.footer {
  /* match height to padding-bottom if needed */
}
</style>
