<template>
  <main class="about-page">
    <h2>O webu</h2>
    <p>Časy pravidelných konání bohoslužeb vychází z údajů uvedených na webu konkrétní farnosti, rádia Proglas, případně TV Noe. Zda a kdy se mše bude konat, ověříte nejlépe přímo na webu farnosti, kde zpravidla naleznete aktuální rozpis bohoslužeb.</p>
    <p>V případě zájmu o <strong>přidání mše svaté</strong> (a velkopátečních obřadů) prosím pište na <a href="mailto:info@mseonline.cz">info@mseonline.cz</a>. <span style="color: #990000">Uvádějte prosím i aktuální časy konání bohoslužeb.</span> Na tento mail pište i v případě, že objevíte nějakou nesrovnalost v časech.</p>
    <img class="about-page__logo" src="/img/logo.svg" alt="MšeOnline.cz">
  </main>
</template>

<style scoped>
  .about-page {
    width: 100%;
    padding: 1rem;
  }

  @media (min-width: 48rem) {
    .about-page {
      width: 70%;
      margin-inline: auto;
    }
  }

  .about-page h2 {
    color: #131846;
    border-bottom: 1px solid #cacaca;
    font-size: 2em;
  }

  .about-page p {
    font-family: Cambria,serif;
    font-size: 1.05em;
    line-height: 1.9em;
    margin: 0 0 1em 0;
  }

  .about-page__logo {
    display: block;
    width: 10rem;
    margin-inline: auto;
  }
</style>
