<template>
  <router-link to="/admin/candidatos">
    <button class="btn btn-primary mt-2 px-5 ms-2">
      <img src="../../../assets/img/btn-regresar.png" />
    </button>
  </router-link>
  <div class="container d-flex justify-content-center">
    <form onsubmit.prevent class="border shadow p-4 border border-dark w-50">
      <h2 class="text-center mb-3">{{EditIsActive ? "Form Editar" : "Form Crear"}}</h2>
      <label for>Nombre</label>
      <input
        class="form-control my-2"
        type="text"
        placeholder="Nombre"
        required="required"
        v-model="candidato.Nombre"
      />
      <label for>Apellido</label>
      <input
        class="form-control my-2"
        type="text"
        placeholder="Apellido"
        required="required"
        v-model="candidato.Apellido"
      />

      <label for>Partido</label>
      <select
        v-for="partido in partidos"
        :key="partido.Id"
        class="form-control my-2"
        required="required"
        v-model="candidato.partidoId"
      >
        <option :value="partido.Id" :selected="partido.Id==candidato.partidoId">{{partido.Nombre}}</option>
      </select>

      <label for>Puesto</label>
      <select
        v-for="puesto in puestos"
        :key="puesto.Id"
        class="form-control my-2"
        required="required"
        v-model="candidato.puestoElectivoId"
      >
        <option
          :value="puesto.Id"
          :selected="puesto.Id==candidato.puestoElectivoId"
        >{{puesto.Nombre}}</option>
      </select>

      <label for>Foto</label>
      <input class="form-control" type="file" name="Image" required="required" />

      <input class="form-control" value="true" type="hidden" name="Estado" required="required" />

      <div class="d-flex justify-content-end">
        <button type="reset" class="btn btn-warning my-3 px-5">Limpiar</button>
        <button
          class="btn btn-primary my-3 px-5 ms-2"
          v-on:click.prevent="validateForm()"
        >{{EditIsActive? "Editar" :"Crear"}}</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      EditIsActive: false,
    };
  },
  methods: {
    ...mapActions([
      "GetAllPartidos",
      "GetAllPuestosElectivos",
      "AddCandidatos",
      "EditCandidatos",
      "GetByIdCandidatos",
    ]),
    validateForm() {
      if (
        this.candidato.Nombre != "" &&
        this.candidato.Apellido != "" &&
        this.candidato.partidoId != "" &&
        this.candidato.puestoElectivoId != ""
      ) {
        console.log(this.candidato);
        this.EditIsActive
          ? this.EditCandidatos(this.candidato)
          : this.AddCandidatos(this.candidato);
        this.$router.push("/admin/candidatos");
      }
    },
    verificarEditMode() {
      const res = this.$router.currentRoute._rawValue.fullPath.indexOf(
        "/admin/candidatos/edit"
      );
      res != -1 ? (this.EditIsActive = true) : (this.EditIsActive = false);
    },
    async LoadEditMode() {
      const userId = this.$router.currentRoute._rawValue.params.id;
      this.GetByIdCandidatos(userId);
    },
  },
  mounted() {
    this.verificarEditMode();
    this.EditIsActive && this.LoadEditMode();
    this.GetAllPartidos();
    this.GetAllPuestosElectivos();
  },
  computed: mapState({
    partidos: (state) => state.modulePartidos.Partidos,
    puestos: (state) => state.modulePuestosElectivos.PuestosElectivos,
    candidato: (state) => state.moduleCandidatos.candidato,
  }),
};
</script>

<style>
</style>