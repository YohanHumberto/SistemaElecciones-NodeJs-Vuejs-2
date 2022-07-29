<template>
  <router-link to="/admin/elecciones">
    <button class="btn btn-primary mt-2 px-5 ms-2">
      <img src="../../../assets/img/btn-regresar.png" />
    </button>
  </router-link>
  <div class="container mt-5 d-flex justify-content-center">
    <form class="border shadow p-5 border border-dark w-50">
      <h2 class="text-center mb-3">Crear Eleccion</h2>
      <label for>Nombre</label>
      <input
        class="form-control my-2"
        type="text"
        v-model="eleccion.Nombre"
        placeholder="Nombre"
        required="required"
      />
      <label for>FechaDeRealizacion</label>
      <input
        class="form-control my-2"
        type="date"
        v-model="eleccion.FechaDeRealizacion"
        placeholder="Fecha De Realizacion"
        required="required"
      />
      <div class="d-flex justify-content-end">
        <button type="reset" class="btn btn-warning my-3 px-5">Limpiar</button>
        <button v-on:click.prevent="validateForm()" class="btn btn-primary my-3 px-5 ms-2">Crear</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions(["AddElecciones"]),
    validateForm() {
      if (
        this.eleccion.Nombre != "" &&
        this.eleccion.FechaDeRealizacion != ""
      ) {
        this.AddElecciones(this.eleccion);
        this.$router.push("/admin/elecciones");
      }
    },
  },
  mounted() {},
  computed: mapState({
    eleccion: (state) => state.moduleElecciones.eleccion,
  }),
};
</script>


<style>
</style>