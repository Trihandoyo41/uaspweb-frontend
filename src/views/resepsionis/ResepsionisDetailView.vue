<template>
  <section class="hero is-small has-background-primary-light" style="box-shadow: 5px 10px grey">
    <div class="hero-body">
      <p class="title">
        DATA RESEPSIONIS
      </p>
      <p class="subtitle">
        Berikut detail biodata resepsionis berdasarkan id nya:
      </p>
    </div>
  </section>
  <section class="content">
    <div v-if="resepsionis">
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-96x96">
                <img src="/src/assets/Logo-rs.png">
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">Biodata Resepsionis</p>
              <p class="subtitle is-6">dengan ID {{id}}</p>
            </div>
          </div>
          <div class="content">
            <dl>
              <dt>Nama</dt>
              <dd><strong>{{resepsionis.nama}}</strong></dd>

              <dt>Jam</dt>
              <dd><strong>{{resepsionis.jam}}</strong></dd>

              <dt>Jenis Kelamin</dt>
              <dd><strong>{{resepsionis.jenis_kelamin}}</strong></dd>

              <dt>Alamat</dt>
              <dd><strong>{{resepsionis.alamat}}</strong></dd>

              <dt>No Telepon</dt>
              <dd><strong>{{resepsionis.no_telepon}}</strong></dd>
            </dl>
            <hr>
            <div class="columns">
              <div class="column">
                <RouterLink to="/resepsionis" class="button is-info">
                  <span class="icon is-small">
                    <i class="fas fa-arrow-left"></i>
                  </span>
                  <span>Kembali</span>
                </RouterLink>
              </div>
              <div class="column has-text-right">
                Created at {{resepsionis.created_at}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="container">
        <div class="notification is-danger">
          Maaf, resepsionis dengan <strong>ID `{{id}}` tidak ditemukan</strong>
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
  name: "ResepsionisDetailView",
  data() {
    return {
      resepsionis: null,
      id: this.$route.params.id,
      isLoading: false
    }
  },
  methods:{
    load(){
      this.isLoading = true;
      fetch(`https://end-projects.000webhostapp.com/resepsionis/get.php?id=${this.id}`,{
        method: 'GET',
      })
        .then(response => {
          if(response.ok){
            return response.json();
          }
        })
        .then(json => {
          this.resepsionis = json.data;
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