<template>
  <section class="isi">
  <section class="hero is-small">
    <div class="judul">
      <p class="title has-text-weight-bold">
        Resepsionis
      </p>
      <p class="subtitle">
        Berikut Adalah Data Resepsionis Yang Akan Melayani Anda Di Klinik Tongfang:
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
          <th>ID Resepsionis</th>
          <th>Nama</th>
          <th>Jam</th>
          <th>Jenis Kelamin</th>
          <th>Alamat</th>
          <th>No. Telepon</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="resepsionis.length" v-for="(value, index) in resepsionis">
          <td>{{index + 1}}</td>
          <td>{{value.id}}</td>
          <td>{{value.nama}}</td>
          <td>{{value.jam}}</td>
          <td>{{value.jenis_kelamin}}</td>
          <td>{{value.alamat}}</td>
          <td>{{value.no_telepon}}</td>
          <td>
            <div class="field has-addons">
              <p class="control">
                <RouterLink class="button is-success" :to="{ name: 'resepsionis-detail', params: { id:  value.id}}">
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
            <li>ID <strong>{{resepsionis[selectedIndex].id}}</strong></li>
            <li>NAMA <strong>{{resepsionis[selectedIndex].nama}}</strong></li>
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
              <label class="label" for="jam_update">Jam</label>
              <div class="control">
                <input class="input" type="text" id="jam_update" placeholder="Jam" required v-model="formEdit.jam">
              </div>
            </div>
            <div class="field">
              <label class="label" for="jenis_kelamin_update">Jenis Kelamin</label>
              <div class="control">
                <input class="input" type="text" id="jenis_kelamin_update" placeholder="L/P" required v-model="formEdit.jenis_kelamin">
              </div>
            </div>
            <div class="field">
              <label class="label" for="alamat_update">Alamat</label>
              <div class="control">
                <input class="input" type="text" id="alamat_update" placeholder="Alamat" required v-model="formEdit.alamat">
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
            <label class="label" for="id_insert">ID Resepsionis</label>
            <div class="control">
              <input class="input" type="number" id="id_insert" placeholder="ID Resepsionis" required v-model="formAdd.id">
            </div>
          </div>
          <div class="field">
            <label class="label" for="nama_insert">Nama</label>
            <div class="control">
              <input class="input" type="text" id="nama_insert" placeholder="Nama" required v-model="formAdd.nama">
            </div>
          </div>
          <div class="field">
            <label class="label" for="jam_insert">Jam</label>
            <div class="control">
              <input class="input" type="text" id="jam_insert" placeholder="Jadwal" required v-model="formAdd.jam">
            </div>
          </div>
          <div class="field">
            <label class="label" for="jenis_kelamin_insert">Jenis Kelamin</label>
            <div class="control">
              <input class="input" type="text" id="jenis_kelamin_insert" placeholder="L/P" required v-model="formAdd.jenis_kelamin">
            </div>
          </div>
          <div class="field">
            <label class="label" for="alamat_insert">Alamat</label>
            <div class="control">
              <input class="input" type="text" id="alamat_insert" placeholder="Alamat" required v-model="formAdd.alamat">
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
  name: "ResepsionisListView",
  data(){
    return{
      resepsionis: [],
      selectedIndex: -1,
      isLoading: false,
      formAdd: {
        id: '',
        nama: '',
        no_telepon: '',
        jam: '',
        alamat: '',
        jenis_kelamin: ''
      },
      formEdit: {
        id: '',
        nama: '',
        no_telepon: '',
        jam: '',
        alamat: '',
        jenis_kelamin: ''
      }
    }
  },
  methods:{
    load(){
      this.isLoading = true;
      fetch(`https://end-projects.000webhostapp.com/resepsionis/index.php`,{
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
    },
    remove(){
      this.closeModal('modal-delete');
      if(this.selectedIndex >= 0){
        const selectedData = this.resepsionis[this.selectedIndex];
        const payload = new URLSearchParams({
          'id': selectedData.id
        });
        fetch(`https://end-projects.000webhostapp.com/resepsionis/delete.php`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: payload.toString(),
        })
          .then(response => {
            if(response.ok){
              this.resepsionis.splice(this.selectedIndex, 1);
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
          id: this.formEdit.id,
          nama: this.formEdit.nama,
          no_telepon: this.formEdit.no_telepon,
          jam: this.formEdit.jam,
          alamat: this.formEdit.alamat,
          jenis_kelamin: this.formEdit.jenis_kelamin
        });
        fetch(`https://end-projects.000webhostapp.com/resepsionis/update.php`,{
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
              this.resepsionis[this.selectedIndex] = json.data;
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
      const selectedData = this.resepsionis[index];
      this.formEdit = {
        id: selectedData.id,
        nama: selectedData.nama,
        no_telepon: selectedData.no_telepon,
        jam: selectedData.jam,
        alamat: selectedData.alamat,
        jenis_kelamin: selectedData.jenis_kelamin
      }
      nextTick(()=>{
        document.getElementById('nama_update').focus();
      })
    },
    showAdd(){
      this.resetFormAdd();
      this.showModal('modal-add');
      nextTick(()=>{
        document.getElementById('id_insert').focus();
      })
    },
    addNew(){
      this.closeModal('modal-add');
      const payload = new URLSearchParams({
        id: this.formAdd.id,
        nama: this.formAdd.nama,
        no_telepon: this.formAdd.no_telepon,
        jam: this.formAdd.jam,
        alamat: this.formAdd.alamat,
        jenis_kelamin: this.formAdd.jenis_kelamin
      });
      fetch(`https://end-projects.000webhostapp.com/resepsionis/create.php`,{
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
            this.resepsionis.push(json.data);
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
        jam: '',
        jenis_kelamin: '',
        no_telepon: ''
      }
    }
  },
  mounted() {
    this.load();
  }
}
</script>

<style scoped>
</style>