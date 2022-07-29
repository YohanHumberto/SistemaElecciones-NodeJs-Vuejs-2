<template>
  <router-link to="/admin/opcciones" style="text-decoration: none;">
    <button class="btn btn-primary px-5 mt-2 py-1 ms-2">
      <img src="../../../assets/img/btn-regresar.png" />
    </button>
  </router-link>
  <div class="container-lg pb-4 mt-2" style="min-height: 80vh;">
    <h1 class="text-center p-2">ELECCIONES</h1>
    <router-link v-if="!ExistElectionActive" to="/admin/elecciones/add">
      <button class="btn btn-success p-2">Nueva Eleccion</button>
    </router-link>
    <table class="w-100 mt-3">
      <tbody class="w-100 border-bottom border-dark">
        <tr class="bg-secondary p-0 fs-5" style="width: 100%;">
          <th scope="col" class="border border-2 border-dark p-md-2">ID</th>
          <th scope="col" class="border border-2 border-dark p-md-2">Nombre</th>
          <th scope="col" class="border border-2 border-dark p-md-2">FechaDeRealizacion</th>
          <th scope="col" class="border border-2 border-dark p-md-2">Estado</th>
          <th scope="col" class="border border-2 border-dark p-md-2">Acciones</th>
        </tr>

        <tr v-for="eleccion in elecciones" :key="eleccion.Id" class="p-0">
          <th class="border border-2 border-dark p-2">{{eleccion.Id}}</th>
          <th class="border border-2 border-dark p-2">{{eleccion.Nombre}}</th>
          <th class="border border-2 border-dark p-2">{{eleccion.FechaDeRealizacion}}</th>
          <th class="border border-2 border-dark p-2">{{eleccion.Estado ? "Activa" :"Inactiva"}}</th>
          <th class="border border-2 border-dark p-2 d-flex justify-content-center">
            <button
              v-if="eleccion.Estado"
              v-on:click.prevent="DisableCiudadano(eleccion.Id)"
              class="btn btn-success"
            >Finalizar</button>
            <router-link v-else :to="'/admin/elecciones/resultados/' + eleccion.Id">
              <button class="btn btn-primary ms-2">Ver Resultados</button>
            </router-link>
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      buttonDesactivarIsActive: true,
    };
  },
  methods: {
    ...mapActions(["GetAllElecciones", "ChangeStateElecciones"]),
    async DisableCiudadano(id) {
      this.ChangeStateElecciones(id);
      this.GetAllElecciones();
    },
  },
  mounted() {
    this.GetAllElecciones();
  },
  computed: mapState({
    elecciones: (state) => state.moduleElecciones.elecciones,
  }),
};
</script>

<style>
</style>