<template>
  <section class="hero is-small has-background-primary-light" style="box-shadow: 5px 10px grey">
    <div class="hero-body">
      <p class="title">
        DATA PASIEN
      </p>
      <p class="subtitle">
        Berikut detail biodata pasien berdasarkan id pasien nya:
      </p>
    </div>
  </section>
  <section class="content">
    <div v-if="pasien">
      <div class="card" style="background: #FFFFFF;box-shadow: 5px 10px grey">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-96x96">
                <img src="/src/assets/Logo-rs.png" alt="image">
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">Biodata Pasien</p>
              <p class="subtitle is-6">dengan ID {{id_pasien}}</p>
            </div>
          </div>
          <div class="content">
            <dl>
              <dt>Nama</dt>
              <dd><strong>{{pasien.nama}}</strong></dd>

              <dt>Tempat Lahir</dt>
              <dd><strong>{{pasien.tempat_lahir}}</strong></dd>

              <dt>Tanggal Lahir</dt>
              <dd><strong>{{pasien.tanggal_lahir}}</strong></dd>

              <dt>Tanggal Masuk</dt>
              <dd><strong>{{pasien.tanggal_masuk}}</strong></dd>

              <dt>Alamat</dt>
              <dd><strong>{{pasien.alamat}}</strong></dd>

              <dt>Nomor BPJS</dt>
              <dd><strong>{{pasien.no_bpjs}} item</strong></dd>

              <dt>Jenis Kelamin</dt>
              <dd><strong>{{pasien.jenis_kelamin}}</strong></dd>

              <dt>Keluhan</dt>
              <dd><strong>{{pasien.keluhan}}</strong></dd>

              <dt>Dokter</dt>
              <dd><strong>{{pasien.dokter.nama}}</strong></dd>

              <dt>Resepsionis</dt>
              <dd><strong>{{pasien.resepsionis.nama}}</strong></dd>
            </dl>
            <hr>
            <div class="columns">
              <div class="column">
                <RouterLink to="/pasien" class="button is-info">
                  <span class="icon is-small">
                    <i class="fas fa-arrow-left"></i>
                  </span>
                  <span>Kembali</span>
                </RouterLink>
              </div>
              <div class="column has-text-right">
                Created at {{pasien.created_at}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="container">
        <div class="notification is-danger">
          Maaf, pasien dengan <strong>ID `{{id_pasien}}` tidak ditemukan</strong>
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
  name: "PasienDetailView",
  data() {
    return {
      pasien: null,
      id_pasien: this.$route.params.id_pasien,
      isLoading: false
    }
  },
  methods:{
    load(){
      this.isLoading = true;
      fetch(`https://end-projects.000webhostapp.com/pasien/get.php?id_pasien=${this.id_pasien}`,{
        method: 'GET',
      })
        .then(response => {
          if(response.ok){
            return response.json();
          }
        })
        .then(json => {
          this.pasien = json.data;
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