<template>
  <section class="isi">
  <section class="hero is-small">
    <div class="judul">
      <p class="title has-text-weight-bold">
        Dokter
      </p>
      <p class="subtitle">
        Berikut Adalah Daftar Nama Dokter Terpercaya Yang Bekerja Di Klinik Kami:
      </p>
    </div>
  </section>

  <section class="content">
    <div class="container">
      <button class="button is-link" @click="showAdd">
        <span class="icon is-small">
                    <i class="fas fa-plus"></i>
                  </span>
        <span>Data baru</span>
      </button>
      <table class="table has-background-success-light">
        <thead>
        <tr>
          <th>#</th>
          <th>ID Dokter</th>
          <th>Nama</th>
          <th>Spesialis</th>
          <th>Ruangan</th>
          <th>Jadwal</th>
          <th>Jenis Kelamin</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="dokter.length" v-for="(value, index) in dokter">
          <td>{{index + 1}}</td>
          <td>{{value.id_dokter}}</td>
          <td>{{value.nama}}</td>
          <td>{{value.spesialis}}</td>
          <td>{{value.ruangan}}</td>
          <td>{{value.jadwal}}</td>
          <td>{{value.jenis_kelamin}}</td>
          <td>
            <div class="field has-addons">
              <p class="control">
                <RouterLink class="button is-success" :to="{ name: 'dokter-detail', params: { id_dokter:  value.id_dokter}}">
                  <span class="icon is-small">
                    <i class="fas fa-arrow-right"></i>
                  </span>
                  <span>Detail</span>
                </RouterLink>
              </p>
              <p class="control">
                <button class="button is-warning" @click="showUpdate(index)">
                  <span class="icon is-small">
                    <i class="fas fa-pencil"></i>
                  </span>
                  <span>Edit</span>
                </button>
              </p>
              <p class="control">
                <button class="button is-danger" @click="showDelete(index)">
                  <span class="icon is-small">
                    <i class="fas fa-trash"></i>
                  </span>
                  <span>Delete</span>
                </button>
              </p>
            </div>
          </td>
        </tr>
        <tr v-else>
          <td colspan="9">
            <div class="notification is-warning">
              Tidak ada data
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="has-text-centered" v-if="isLoading">
      <i class="fa-solid fa-spinner fa-pulse"></i>
    </div>
  </section>
  </section>
  <div class="modal" id="modal-delete">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Confirm Delete</p>
      </header>
      <section class="modal-card-body">
        <div v-if="selectedIndex > -1">
          <ul>
            <li>ID DOKTER <strong>{{dokter[selectedIndex].id_dokter}}</strong></li>
            <li>NAMA <strong>{{dokter[selectedIndex].nama}}</strong></li>
            <li>SPESIALIS <strong>{{dokter[selectedIndex].spesialis}}</strong></li>
          </ul>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-danger" @click="remove">Delete</button>
        <button class="button" @click="closeModal('modal-delete')">Close</button>
      </footer>
    </div>
  </div>
  <div class="modal" id="modal-update">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Form Update</p>
      </header>
      <section class="modal-card-body">
        <div v-if="selectedIndex >= 0">
          <form @submit.prevent="update">
            <div class="field">
              <label class="label" for="nama_update">Nama</label>
              <div class="control">
                <input class="input" type="text" id="nama_update" placeholder="Nama" required v-model="formEdit.nama">
              </div>
            </div>
            <div class="field">
              <label class="label" for="alamat_update">Alamat</label>
              <div class="control">
                <input class="input" type="text" id="alamat_update" placeholder="Alamat" required v-model="formEdit.alamat">
              </div>
            </div>
            <div class="field">
              <label class="label" for="spesialis_update">Spesialis</label>
              <div class="control">
                <input class="input" type="text" id="spesialis_update" placeholder="Spesialis" required v-model="formEdit.spesialis">
              </div>
            </div>
            <div class="field">
              <label class="label" for="ruangan_update">Ruangan</label>
              <div class="control">
                <input class="input" type="text" id="ruangan_update" placeholder="Ruangan" required v-model="formEdit.ruangan">
              </div>
            </div>
            <div class="field">
              <label class="label" for="jadwal_update">Jadwal</label>
              <div class="control">
                <input class="input" type="text" id="jadwal_update" placeholder="Jadwal" required v-model="formEdit.jadwal">
              </div>
            </div>
            <div class="field">
              <label class="label" for="jenis_kelamin_update">Jenis Kelamin</label>
              <div class="control">
                <input class="input" type="text" id="jenis_kelamin_update" placeholder="L/P" required v-model="formEdit.jenis_kelamin">
              </div>
            </div>
            <div class="field">
              <label class="label" for="no_telepon_update">No Telepon</label>
              <div class="control">
                <input class="input" type="text" id="no_telepon_update" placeholder="No Telepon" required v-model="formEdit.no_telepon">
              </div>
            </div>
          </form>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="update">Update</button>
        <button class="button" @click="closeModal('modal-update')">Close</button>
      </footer>
    </div>
  </div>
  <div class="modal" id="modal-add">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Add new</p>
      </header>
      <section class="modal-card-body">
        <form @submit.prevent="addNew">
          <div class="field">
            <label class="label" for="id_dokter_insert">ID Dokter</label>
            <div class="control">
              <input class="input" type="number" id="id_dokter_insert" placeholder="ID Dokter" required v-model="formAdd.id_dokter">
            </div>
          </div>
          <div class="field">
            <label class="label" for="nama_insert">Nama</label>
            <div class="control">
              <input class="input" type="text" id="nama_insert" placeholder="Nama" required v-model="formAdd.nama">
            </div>
          </div>
          <div class="field">
            <label class="label" for="alamat_insert">Alamat</label>
            <div class="control">
              <input class="input" type="text" id="alamat_insert" placeholder="Alamat" required v-model="formAdd.alamat">
            </div>
          </div>
          <div class="field">
            <label class="label" for="spesialis_insert">Spesialis</label>
            <div class="control">
              <input class="input" type="text" id="spesialis_insert" placeholder="Spesialis" required v-model="formAdd.spesialis">
            </div>
          </div>
          <div class="field">
            <label class="label" for="ruangan_insert">Ruangan</label>
            <div class="control">
              <input class="input" type="text" id="ruangan_insert" placeholder="Ruangan" required v-model="formAdd.ruangan">
            </div>
          </div>
          <div class="field">
            <label class="label" for="jadwal_insert">Jadwal</label>
            <div class="control">
              <input class="input" type="text" id="jadwal_insert" placeholder="Jadwal" required v-model="formAdd.jadwal">
            </div>
          </div>
          <div class="field">
            <label class="label" for="jenis_kelamin_insert">Jenis Kelamin</label>
            <div class="control">
              <input class="input" type="text" id="jenis_kelamin_insert" placeholder="L/P" required v-model="formAdd.jenis_kelamin">
            </div>
          </div>
          <div class="field">
            <label class="label" for="no_telepon_insert">No Telepon</label>
            <div class="control">
              <input class="input" type="text" id="no_telepon_insert" placeholder="No Telepon" required v-model="formAdd.no_telepon">
            </div>
          </div>
        </form>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="addNew">Save</button>
        <button class="button" @click="closeModal('modal-add')">Close</button>
      </footer>
    </div>
  </div>
</template>

<script>
import {nextTick} from "vue";
export default {
  name: "DokterListView",
  data(){
    return{
      dokter: [],
      selectedIndex: -1,
      isLoading: false,
      formAdd: {
        id_dokter: '',
        nama: '',
        alamat: '',
        spesialis: '',
        ruangan: '',
        jadwal: '',
        jenis_kelamin: '',
        no_telepon: ''
      },
      formEdit: {
        id_dokter: '',
        nama: '',
        alamat: '',
        spesialis: '',
        ruangan: '',
        jadwal: '',
        jenis_kelamin: '',
        no_telepon: ''
      }
    }
  },
  methods:{
    loadDokter(){
      this.isLoading = true;
      fetch(`https://end-projects.000webhostapp.com/dokter/index.php`,{
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
    },
    remove(){
      this.closeModal('modal-delete');
      if(this.selectedIndex >= 0){
        const selectedData = this.dokter[this.selectedIndex];
        const payload = new URLSearchParams({
          'id_dokter': selectedData.id_dokter
        });
        fetch(`https://end-projects.000webhostapp.com/dokter/delete.php`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: payload.toString(),
        })
          .then(response => {
            if(response.ok){
              this.dokter.splice(this.selectedIndex, 1);
            }
            return response.json();
          })
          .then(json =>{
            if(!json.status){
              alert(json.error);
            }
          })
          .catch(()=>{
            alert('Terjadi error')
          })
      }
      this.selectedIndex = -1;
    },
    update(){
      this.closeModal('modal-update');
      if(this.selectedIndex >= 0){
        const payload = new URLSearchParams({
          id_dokter: this.formEdit.id_dokter,
          nama: this.formEdit.nama,
          alamat: this.formEdit.alamat,
          spesialis: this.formEdit.spesialis,
          ruangan: this.formEdit.ruangan,
          jadwal: this.formEdit.jadwal,
          jenis_kelamin: this.formEdit.jenis_kelamin,
          no_telepon: this.formEdit.no_telepon
        });
        fetch(`https://end-projects.000webhostapp.com/dokter/update.php`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: payload.toString(),
        })
          .then(response => {
            return response.json()
          })
          .then(json =>{
            if(!json.status){
              alert(json.error);
            }else{
              /*
              Update data pada kolom yg diupdate
               */
              this.dokter[this.selectedIndex] = json.data;
            }
          })
          .catch( (e) =>{
            alert('Terjadi error'+e.toString())
          })
          .finally(()=>{
            this.selectedIndex = -1;
          })
      }
    },
    showDelete(index){
      this.showModal('modal-delete');
      this.selectedIndex = index;
    },
    showUpdate(index){
      this.showModal('modal-update');
      this.selectedIndex = index;
      const selectedData = this.dokter[index];
      this.formEdit = {
        id_dokter: selectedData.id_dokter,
        nama: selectedData.nama,
        alamat: selectedData.alamat,
        spesialis: selectedData.spesialis,
        ruangan: selectedData.ruangan,
        jadwal: selectedData.jadwal,
        jenis_kelamin: selectedData.jenis_kelamin,
        no_telepon: selectedData.no_telepon
      }
      nextTick(()=>{
        document.getElementById('nama_update').focus();
      })
    },
    showAdd(){
      this.resetFormAdd();
      this.showModal('modal-add');
      nextTick(()=>{
        document.getElementById('id_dokter_insert').focus();
      })
    },
    addNew(){
      this.closeModal('modal-add');
      const payload = new URLSearchParams({
        id_dokter: this.formAdd.id_dokter,
        nama: this.formAdd.nama,
        alamat: this.formAdd.alamat,
        spesialis: this.formAdd.spesialis,
        ruangan: this.formAdd.ruangan,
        jadwal: this.formAdd.jadwal,
        jenis_kelamin: this.formAdd.jenis_kelamin,
        no_telepon: this.formAdd.no_telepon
      });
      fetch(`https://end-projects.000webhostapp.com/dokter/create.php`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payload.toString(),
      })
        .then(response => {
          return response.json()
        })
        .then(json =>{
          if(!json.status){
            alert(json.error);
          }else{
            this.dokter.push(json.data);
          }
        })
        .catch( (e) =>{
          alert('Terjadi error'+e.toString())
        })
        .finally(()=>{
          this.formAdd.nama = '';
        })
    },
    showModal(id){
      document.getElementById(id).classList.add('is-active');
    },
    closeModal(id){
      document.getElementById(id).classList.remove('is-active');
    },
    resetFormAdd(){
      this.formAdd = {
        nama: '',
        alamat: '',
        spesialis: '',
        ruangan: '',
        jadwal: '',
        jenis_kelamin: '',
        no_telepon: ''
      }
    }
  },
  mounted() {
    this.loadDokter();
  }
}
</script>

<style scoped>
</style>