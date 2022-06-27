<template>
  <section class="hero is-small has-text-centered">
    <div class="hero-body has-background-light">
      <p class="title">
        Error 404
      </p>
      <p class="subtitle">
        Maaf, halaman web yang anda cari tidak ditemukan
      </p>
      <p>
        <RouterLink class="has-text-centered button is-info" to="/">
          Kembali
        </RouterLink>
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: "Error404"
}
</script>

<style scoped>
</style>