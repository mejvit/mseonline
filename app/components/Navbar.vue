<template>
  <nav class="site-navbar" aria-label="Hlavni navigace">
    <ul class="site-navbar__list">
      <li class="site-navbar__item">
        <NuxtLink class="site-navbar__link" to="/">Úvod</NuxtLink>
      </li>
      <li class="site-navbar__item">
        <a class="site-navbar__link" href="https://kancional.cz/042" target="_blank">Modlitba: Duchovní přijímání</a>
      </li>
      <li class="site-navbar__item">
        <NuxtLink class="site-navbar__link" to="/about">O webu</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
  .site-navbar {
    z-index:999;
    background-color:#222;
    font-family:Verdana,Trebuchet MS,Arial,Helvetica,sans-serif;
    font-size:.9em;
    padding:.6em;
    position:fixed;
    top:0;
    text-align:center;
    width:100%;
    border-bottom:1px solid #131846;
    text-shadow:0 -1px #131846;
    overflow:auto;
    white-space:nowrap
  }
  .site-navbar__link,
  .site-navbar__link:visited {
    color:#fff;
    text-decoration:none
  }
  .site-navbar__link--highlighted {
    color: gold
  }
  .site-navbar__link:hover {
    color:#a6adf0
  }
  .site-navbar__list {
    margin:0 auto
  }
  .site-navbar__item {
    display:inline-block;
    margin:0 3em 0 0
  }
  .site-navbar__item:first-child {
    margin-left:1em
  }
</style>
