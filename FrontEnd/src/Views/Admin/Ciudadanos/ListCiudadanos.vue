<template>
  <main>
    <router-link to="/admin/opcciones" style="text-decoration: none;">
      <button class="btn btn-primary px-5 mt-2 py-1 ms-2">
        <img src="../../../assets/img/btn-regresar.png" />
      </button>
    </router-link>
    <div class="container-lg pb-4 mt-2" style="min-height: 80vh;">
      <h1 class="text-center p-2">CIUDADANOS</h1>
      <router-link to="/admin/ciudadanos/add">
        <button class="btn btn-success p-2">Nuevo Ciudadano</button>
      </router-link>
      <table class="mt-3 row mx-0">
        <tbody class="col row m-0 p-0 border-bottom border-dark">
          <tr class="col-12 row bg-secondary m-0 p-0 fs-3">
            <th class="col-2 border border-2 border-dark py-2">Dodumendo de Identidad</th>
            <th class="col-2 border border-2 border-dark py-2">Nombre</th>
            <th class="col-2 border border-2 border-dark py-2">Apellido</th>
            <th class="col-2 border border-2 border-dark py-2">Email</th>
            <th class="col-2 border border-2 border-dark py-2">Estado</th>
            <th class="col-2 border border-2 border-dark py-2">Acciones</th>
          </tr>
          <tr
            v-for="ciudadano in ciudadanos"
            :key="ciudadano.DocumentoDeIdentidad"
            class="col-12 row m-0 p-0 fs-5"
          >
            <th
              class="col-2 border border-2 border-dark py-2"
              style="overflow: hidden;"
            >{{ciudadano.DocumentoDeIdentidad}}</th>
            <th
              class="col-2 border border-2 border-dark py-2"
              style="overflow: hidden;"
            >{{ciudadano.Nombre}}</th>
            <th
              class="col-2 border border-2 border-dark py-2"
              style="overflow: hidden;"
            >{{ciudadano.Apellido}}</th>
            <th
              class="col-2 border border-2 border-dark py-2"
              style="overflow: hidden;"
            >{{ciudadano.Email}}</th>
            <th
              class="col-2 border border-2 border-dark py-2"
              style="overflow: hidden;"
            >{{ ciudadano.Estado ? "Activo" : "Inactivo"}}</th>
            <th
              class="col-2 border border-2 border-dark py-2 d-flex justify-content-center"
              style="overflow: hidden;"
            >
              <router-link
                v-if="ciudadano.Estado"
                :to="'/admin/ciudadanos/edit/'+ ciudadano.DocumentoDeIdentidad"
              >
                <button class="btn btn-warning">Editar</button>
              </router-link>
              <button
                v-on:click.prevent="DisableCiudadano(ciudadano.DocumentoDeIdentidad)"
                class="btn ms-2"
                :class="{ disable : !buttonDesactivarIsActive, 'btn-danger': ciudadano.Estado, 'btn-success': !ciudadano.Estado }"
              >{{ciudadano.Estado ? "Desactivar" : "Activar"}}</button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
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
    ...mapActions(["GetAllCiudadanos", "ChangeStateCiudadanos"]),
    async DisableCiudadano(id) {
      this.ChangeStateCiudadanos(id);
      this.GetAllCiudadanos();
    },
  },
  mounted() {
    this.GetAllCiudadanos();
  },
  computed: mapState({
    ciudadanos: (state) => state.moduleCiudadanos.ciudadanos,
  }),
};
</script>

<style>
</style>