<template>
  <section class="isi">
  <section class="hero is-small">
    <div class="judul">
      <p class="title has-text-weight-bold">
        Pasien
      </p>
      <p class="subtitle">
        Berikut Adalah Data Pasien Yang Sudah Terdaftar Di Klinik Kami:
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
          <th>ID Pasien</th>
          <th>Nama</th>
          <th>Tanggal Masuk</th>
          <th>Alamat</th>
          <th>No. BPJS</th>
          <th>Keluhan</th>
          <th>Dokter</th>
          <th>Resepsionis</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="pasien.length" v-for="(value, index) in pasien">
          <td>{{index + 1}}</td>
          <td>{{value.id_pasien}}</td>
          <td>{{value.nama}}</td>
          <td>{{value.tanggal_masuk}}</td>
          <td>{{value.alamat}}</td>
          <td>{{value.no_bpjs}}</td>
          <td>{{value.keluhan}}</td>
          <td>{{value.dokter.nama}}</td>
          <td>{{value.resepsionis.nama}}</td>
          <td>
            <div class="field has-addons">
              <p class="control">
                <RouterLink class="button is-success" :to="{ name: 'pasien-detail', params: { id_pasien:  value.id_pasien}}">
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
            <li>ID PASIEN <strong>{{pasien[selectedIndex].id_pasien}}</strong></li>
            <li>NAMA <strong>{{pasien[selectedIndex].nama}}</strong></li>
            <li>KELUHAN <strong>{{pasien[selectedIndex].keluhan}}</strong></li>
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
              <label class="label" for="tempat_lahir_update">Tempat Lahir</label>
              <div class="control">
                <input class="input" type="text" id="tempat_lahir_update" placeholder="Tempat Lahir" required v-model="formEdit.tempat_lahir">
              </div>
            </div>
            <div class="field">
              <label class="label" for="tanggal_lahir_update">Tanggal Lahir</label>
              <div class="control">
                <input class="input" type="date" id="tanggal_lahir_update" placeholder="Tanggal lahir" required v-model="formEdit.tanggal_lahir">
              </div>
            </div>
            <div class="field">
              <label class="label" for="tanggal_masuk_update">Tanggal Masuk</label>
              <div class="control">
                <input class="input" type="date" id="tanggal_masuk_update" placeholder="Tanggal masuk" required v-model="formEdit.tanggal_masuk">
              </div>
            </div>
            <div class="field">
              <label class="label" for="alamat_update">Alamat</label>
              <div class="control">
                <input class="input" type="text" id="alamat_update" placeholder="Alamat" required v-model="formEdit.alamat">
              </div>
            </div>
            <div class="field">
              <label class="label" for="no_bpjs_update">Nomor BPJS</label>
              <div class="control">
                <input class="input" type="text" id="no_bpjs_update" placeholder="NO. BPJS" required v-model="formEdit.no_bpjs">
              </div>
            </div>
            <div class="field">
              <label class="label" for="jenis_kelamin_update">Jenis Kelamin</label>
              <div class="control">
                <input class="input" type="text" id="jenis_kelamin_update" placeholder="L/P" required v-model="formEdit.jenis_kelamin">
              </div>
            </div>
            <div class="field">
              <label class="label" for="keluhan_update">Keluhan</label>
              <div class="control">
                <input class="input" type="text" id="keluhan_update" placeholder="Keluhan" required v-model="formEdit.keluhan">
              </div>
            </div>
            <div class="field">
              <label class="label" for="dokter_update">Dokter</label>
              <div class="control">
                <div class="select is-primary">
                  <select name="dokter_update" id="dokter_update" v-model="formEdit.dokter">
                    <option v-for="val in dokter" :value="val.id_dokter">{{val.nama}}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label" for="resepsionis_update">Resepsionis</label>
              <div class="control">
                <div class="select is-primary">
                  <select name="resepsionis_update" id="resepsionis_update" v-model="formEdit.resepsionis">
                    <option v-for="val in resepsionis" :value="val.id">{{val.nama}}</option>
                  </select>
                </div>
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
      <section class="modal-card-body" style="background: #d8f2fb">
        <form @submit.prevent="addNew">
          <div class="field">
            <label class="label" for="id_pasien_insert">ID Pasien</label>
            <div class="control">
              <input class="input" type="number" id="id_pasien_insert" placeholder="ID Pasien" required v-model="formAdd.id_pasien">
            </div>
          </div>
          <div class="field">
            <label class="label" for="nama_insert">Nama</label>
            <div class="control">
              <input class="input" type="text" id="nama_insert" placeholder="Nama" required v-model="formAdd.nama">
            </div>
          </div>
          <div class="field">
            <label class="label" for="tempat_lahir_insert">Tempat Lahir</label>
            <div class="control">
              <input class="input" type="text" id="tempat_lahir_insert" placeholder="Tempat Lahir" required v-model="formAdd.tempat_lahir">
            </div>
          </div>
          <div class="field">
            <label class="label" for="tanggal_lahir_insert">Tanggal Lahir</label>
            <div class="control">
              <input class="input" type="date" id="tanggal_lahir_insert" placeholder="Tanggal lahir" required v-model="formAdd.tanggal_lahir">
            </div>
          </div>
          <div class="field">
            <label class="label" for="tanggal_masuk_insert">Tanggal Masuk</label>
            <div class="control">
              <input class="input" type="date" id="tanggal_masuk_insert" placeholder="Tanggal masuk" required v-model="formAdd.tanggal_masuk">
            </div>
          </div>
          <div class="field">
            <label class="label" for="alamat_insert">Alamat</label>
            <div class="control">
              <input class="input" type="text" id="alamat_insert" placeholder="Alamat" required v-model="formAdd.alamat">
            </div>
          </div>
          <div class="field">
            <label class="label" for="no_bpjs_insert">Nomor BPJS</label>
            <div class="control">
              <input class="input" type="text" id="no_bpjs_insert" placeholder="NO. BPJS" required v-model="formAdd.no_bpjs">
            </div>
          </div>
          <div class="field">
            <label class="label" for="jenis_kelamin_insert">Jenis Kelamin</label>
            <div class="control">
              <input class="input" type="text" id="jenis_kelamin_insert" placeholder="L/P" required v-model="formAdd.jenis_kelamin">
            </div>
          </div>
          <div class="field">
            <label class="label" for="keluhan_insert">Keluhan</label>
            <div class="control">
              <input class="input" type="text" id="keluhan_insert" placeholder="Keluhan" required v-model="formAdd.keluhan">
            </div>
          </div>
          <div class="field">
            <label class="label" for="dokter_insert">Dokter</label>
            <div class="control">
              <div class="select is-primary">
                <select name="dokter_insert" id="dokter_insert" v-model="formAdd.dokter">
                  <option v-for="val in dokter" :value="val.id_dokter">{{val.nama}}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label" for="resepsionis_insert">Resepsionis</label>
            <div class="control">
              <div class="select is-primary">
                <select name="resepsionis_insert" id="resepsionis_insert" v-model="formAdd.resepsionis">
                  <option v-for="val in resepsionis" :value="val.id">{{val.nama}}</option>
                </select>
              </div>
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
  name: "PasienListView",
  data(){
    return{
      pasien: [],
      dokter: [],
      resepsionis: [],
      selectedIndex: -1,
      isLoading: false,
      formAdd: {
        id_pasien: '',
        nama: '',
        tempat_lahir: '',
        tanggal_lahir: new Date().toISOString().slice(0, 10),
        tanggal_masuk: new Date().toISOString().slice(0, 10),
        alamat: '',
        no_bpjs: '',
        jenis_kelamin: '',
        keluhan: '',
        dokter: '',
        resepsionis: ''
      },
      formEdit: {
        id_pasien: '',
        nama: '',
        tempat_lahir: '',
        tanggal_lahir: new Date().toISOString().slice(0, 10),
        tanggal_masuk: new Date().toISOString().slice(0, 10),
        alamat: '',
        no_bpjs: '',
        jenis_kelamin: '',
        keluhan: '',
        dokter: '',
        resepsionis: ''
      }
    }
  },
  methods:{
    load(){
      this.isLoading = true;
      fetch(`https://end-projects.000webhostapp.com/pasien/index.php`,{
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
    },
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
    loadResepsionis(){
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
        const selectedData = this.pasien[this.selectedIndex];
        const payload = new URLSearchParams({
          'id_pasien': selectedData.id_pasien
        });
        fetch(`https://end-projects.000webhostapp.com/pasien/delete.php`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: payload.toString(),
        })
          .then(response => {
            if(response.ok){
              this.pasien.splice(this.selectedIndex, 1);
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
          id_pasien: this.formEdit.id_pasien,
          nama: this.formEdit.nama,
          tempat_lahir: this.formEdit.tempat_lahir,
          tanggal_lahir: this.formEdit.tanggal_lahir,
          tanggak_masuk: this.formEdit.tanggal_masuk,
          alamat: this.formEdit.alamat,
          no_bpjs: this.formEdit.no_bpjs,
          jenis_kelamin: this.formEdit.jenis_kelamin,
          keluhan: this.formEdit.keluhan,
          dokter: this.formEdit.dokter,
          resepsionis: this.formEdit.resepsionis
        });
        fetch(`https://end-projects.000webhostapp.com/pasien/update.php`,{
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
              this.pasien[this.selectedIndex] = json.data;
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
      const selectedData = this.pasien[index];
      this.formEdit = {
        id_pasien: selectedData.id_pasien,
        nama: selectedData.nama,
        tempat_lahir: selectedData.tempat_lahir,
        tanggal_lahir: selectedData.tanggal_lahir,
        tanggak_masuk: selectedData.tanggal_masuk,
        alamat: selectedData.alamat,
        no_bpjs: selectedData.no_bpjs,
        jenis_kelamin: selectedData.jenis_kelamin,
        keluhan: selectedData.keluhan,
        dokter: selectedData.dokter.id_dokter,
        resepsionis: selectedData.resepsionis.id
      }
      nextTick(()=>{
        document.getElementById('nama_update').focus();
      })
    },
    showAdd(){
      this.resetFormAdd();
      this.showModal('modal-add');
      nextTick(()=>{
        document.getElementById('id_pasien_insert').focus();
      })
    },
    addNew(){
      this.closeModal('modal-add');
      const payload = new URLSearchParams({
        id_pasien: this.formAdd.id_pasien,
        nama: this.formAdd.nama,
        tempat_lahir: this.formAdd.tempat_lahir,
        tanggal_lahir: this.formAdd.tanggal_lahir,
        tanggak_masuk: this.formAdd.tanggal_masuk,
        alamat: this.formAdd.alamat,
        no_bpjs: this.formAdd.no_bpjs,
        jenis_kelamin: this.formAdd.jenis_kelamin,
        keluhan: this.formAdd.keluhan,
        dokter: this.formAdd.dokter,
        resepsionis: this.formAdd.resepsionis
      });
      fetch(`https://end-projects.000webhostapp.com/pasien/create.php`,{
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
            this.pasien.push(json.data);
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
        tempat_lahir: '',
        tanggal_lahir: new Date().toISOString().slice(0, 10),
        tanggal_masuk: new Date().toISOString().slice(0, 10),
        alamat: '',
        no_bpjs: '',
        jenis_kelamin: '',
        keluhan: '',
        dokter: '',
        resepsionis: ''
      }
    }
  },
  mounted() {
    this.load();
    this.loadDokter();
    this.loadResepsionis();
  }
}
</script>

<style scoped>
</style>