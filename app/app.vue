<template>
  <div>
    <NuxtRouteAnnouncer />

    <Navbar />

    <div class="app__page">
      <header class="app__header">
        <h1 class="app__logo">
          <Logo />
        </h1>
      </header>

      <NuxtPage />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Logo from './components/Logo.vue';
import Navbar from './components/Navbar.vue';

export default defineComponent({
  components: {
    Logo,
    Navbar,
  },
});
</script>

<style scoped>
  .app__page {
    width: 100%;
    padding-inline: 1rem;
  }

  .app__header {
    padding-block: 4rem 1.5rem;
  }

  .app__logo {
    margin: 0;
  }

  @media (min-width: 48rem) {
    .app__page {
      width: 90%;
      margin-inline: auto;
      padding-inline: 0;
    }
  }
</style>
