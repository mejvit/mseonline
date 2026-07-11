<template>
  <div>
    <NuxtRouteAnnouncer />

    <Navbar />

    <div class="app__page">
      <NuxtPage />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from './components/Navbar.vue';

export default defineComponent({
  components: {
    Navbar,
  },
});
</script>

<style scoped>
  .app__page {
    width: 100%;
  }

  @media (min-width: 48rem) {
    .app__page {
      width: 90%;
      margin-inline: auto;
    }
  }
</style>
