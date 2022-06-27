<template>
  <footer class="footer" style="background: #d8f2fb">
   <p class="subtitle has-text-centered has-text-weight-bold">TENTANG KLINIK KAMI</p>
    <div class="columns">
      <div class="column">
        <img class="image" src="/src/assets/lofo-foot.png">
      </div>
      <div class="column">
        <p class="subtitle has-text-weight-semibold">HALAMAN</p>
        <p class="content"><RouterLink to="/">Beranda</RouterLink></p>
        <p class="content"><RouterLink to="/about">Tentang Kami</RouterLink></p>
        <p class="content"><RouterLink to="/ketentuan">Informasi</RouterLink></p>
      </div>
      <div class="column">
        <p class="subtitle has-text-weight-semibold">ALAMAT</p>
        <div class="content">Jalan Garuda Sakti No. 52
        Kecamatan Tampan
        Kota Pekanbaru</div>
      </div>
      <div class="column">
        <p class="subtitle has-text-weight-semibold">IKUTI KAMI</p>
        <p class="content">Instagram</p>
        <p class="content">Facebook</p>
        <p class="content">Linkedln</p>
      </div>
      <div class="column">
        <p class="subtitle has-text-weight-semibold">LEGAL</p>
        <p class="content"><RouterLink to="/ketentuan">Peringatan</RouterLink></p>
        <p class="content">Aturan</p>
      </div>
      <div class="column">
        <p class="subtitle has-text-weight-semibold">BISNIS</p>
        <p class="content"><a href="mailto:tongfang@gmail.com">tongfang@gmail.com</a></p>
        <p class="content"><a href="tel:1230987653">123 098 7653</a></p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterView",
}
</script>

<style scoped>
</style>