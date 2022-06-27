<template>
  <section class="hero is-small">
      <div class="media-left">
      <img src="/src/assets/Logo-rs.png" alt="image" style="width: 120px">
      </div>
      <br/>
    <div class="columns" style="background: rgb(216, 242, 251, 70%); padding: 20px; border-radius: 10px">
      <div class="column is-three-quarters">
      <p class="title has-text-weight-bold">
        SELAMAT DATANG DI KLINIK TONGFANG<br>RUMAH KESEHATAN<br>DARI KAMI UNTUK ANDA</p>
        <p class="subtitle"> DISCOVER NEW METHODE BEING HEALTHY</p>
      <hr>
      <p class="subtitle has-text-warning-dark">*Note : Baca terlebih dahulu ketentuan website ini agar tidak salah presepsi</p>
        <RouterLink to="/ketentuan" class="button is-warning">
          <span class="icon is-small">
                    <i class="fas fa-warning"></i>
                  </span>
          <span>Info Penting</span>
        </RouterLink>
      </div>
      <div class="column">
      <figure>
        <img src="/src/assets/logo-layanan.png" alt="image">
      </figure>
      </div>
    </div>
    <img src="/src/assets/bersama.png">
  </section>
</template>


<style scoped>
.sidebar{
  float: right;
}
</style>