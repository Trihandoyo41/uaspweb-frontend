<template>
  <nav class="navbar" role="navigation" aria-label="main navigation" style="background: #d8f2fb">
    <div class="navbar-brand">
      <a class="navbar-item" href="">
        <img src="/src/assets/Logo-rs-tf.svg" width="112" height="28">
      </a>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" style="background: lightskyblue">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <RouterLink class="navbar-item" to="/">
          <span class="icon is-48x48">
            <img src="/src/assets/home.svg">
          </span>
          <span>Beranda</span>
        </RouterLink>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            <span class="icon is-48x48">
            <img src="/src/assets/list-circle.svg">
          </span>
            <span>Data Klinik</span>
          </a>
          <div class="navbar-dropdown">
            <RouterLink class="navbar-item" to="/pasien">
              Pasien
            </RouterLink>
            <RouterLink class="navbar-item" to="/dokter">
              Dokter
            </RouterLink>
            <RouterLink class="navbar-item" to="/resepsionis">
              Resepsionis
            </RouterLink>
          </div>
        </div>
        <RouterLink class="navbar-item" to="/about">
          <span class="icon is-48x48">
            <img src="/src/assets/information-circle.svg">
          </span>
          <span>Tentang Kami</span>
        </RouterLink>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="image">
            <div style="font-family: 'Bookman Old Style'">Klinik Tong Fang</div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarView"
};
</script>

<style scoped>

</style>