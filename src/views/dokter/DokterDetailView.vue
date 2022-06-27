<template>
  <section class="hero is-small has-background-primary-light" style="box-shadow: 5px 10px grey">
    <div class="hero-body">
      <p class="title">
        DATA DOKTER
      </p>
      <p class="subtitle">
        Berikut detail biodata dokter berdasarkan id nya:
      </p>
    </div>
  </section>
  <section class="content">
    <div v-if="dokter">
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-96x96">
                <img src="/src/assets/Logo-rs.png" alt="image">
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">Biodata Dokter</p>
              <p class="subtitle is-6">dengan ID {{id_dokter}}</p>
            </div>
          </div>
          <div class="content">
            <dl>
              <dt>Nama</dt>
              <dd><strong>{{dokter.nama}}</strong></dd>

              <dt>Alamat</dt>
              <dd><strong>{{dokter.alamat}}</strong></dd>

              <dt>Spesialis</dt>
              <dd><strong>{{dokter.spesialis}} item</strong></dd>

              <dt>Ruangan</dt>
              <dd><strong>{{dokter.ruangan}}</strong></dd>

              <dt>Jadwal</dt>
              <dd><strong>{{dokter.jadwal}}</strong></dd>

              <dt>Jenis Kelamin</dt>
              <dd><strong>{{dokter.jenis_kelamin}}</strong></dd>

              <dt>No Telepon</dt>
              <dd><strong>{{dokter.no_telepon}}</strong></dd>
            </dl>
            <hr>
            <div class="columns">
              <div class="column">
                <RouterLink to="/dokter" class="button is-info">
                  <span class="icon is-small">
                    <i class="fas fa-arrow-left"></i>
                  </span>
                  <span>Kembali</span>
                </RouterLink>
              </div>
              <div class="column has-text-right">
                Created at {{dokter.created_at}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="container">
        <div class="notification is-danger">
          Maaf, dokter dengan <strong>ID `{{id_dokter}}` tidak ditemukan</strong>
        </div>
      </div>
    </div>
    <div class="has-text-centered" v-if="isLoading">
      <i class="fa-solid fa-spinner fa-pulse"></i>
    </div>
  </section>
</template>

<script>
export default {
  name: "DokterDetailView",
  data() {
    return {
      dokter: null,
      id_dokter: this.$route.params.id_dokter,
      isLoading: false
    }
  },
  methods:{
    load(){
      this.isLoading = true;
      fetch(`https://end-projects.000webhostapp.com/dokter/get.php?id_dokter=${this.id_dokter}`,{
        method: 'GET',
      })
        .then(response => {
          if(response.ok){
            return response.json();
          }
        })
        .then(json => {
          this.dokter = json.data;
        })
        .catch(()=>{
          alert('Terjadi error')
        })
        .finally(()=>{
          this.isLoading = false;
        })
    }
  },
  mounted() {
    this.load();
  }
}
</script>

<style scoped>
</style>