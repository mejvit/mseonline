<template>
  <NuxtLink class="site-logo" to="/" title="Kliknutím se dostanete na úvodní stránku">
    <img class="site-logo__mark" src="/img/logo.svg" alt="Mše svaté online">

    <span class="site-logo__text">
      <span class="site-logo__title">Mše svaté on-line</span>
      <span class="site-logo__subtitle">Přehled on-line vysílaných katolických bohoslužeb</span>
    </span>
  </NuxtLink>
</template>

<style scoped>
  .site-logo {
    display: inline-flex;
    gap: clamp(.5rem, 2vw, 1rem);
    align-items: center;
    color: #131846;
    font-family: "Trebuchet MS", Helvetica, sans-serif;
    text-align: left;
    text-decoration: none;
    transition: color .2s ease;
  }

  .site-logo:visited {
    color: #131846;
  }

  .site-logo:hover,
  .site-logo:focus-visible {
    color: #3d4377;
  }

  .site-logo__mark {
    display: block;
    width: auto;
    height: calc(clamp(1.98rem, 5.4vw, 2.97rem) + .35rem + clamp(.855rem, 1.8vw, 1.035rem) * 1.3);
    flex: 0 0 auto;
  }

  .site-logo__text {
    display: flex;
    flex-direction: column;
    gap: .35rem;
  }

  .site-logo__title {
    font-size: clamp(1.98rem, 5.4vw, 2.97rem);
    font-weight: 700;
    line-height: 1;
  }

  .site-logo__subtitle {
    font-size: clamp(.855rem, 1.8vw, 1.035rem);
    line-height: 1.3;
  }
</style>
