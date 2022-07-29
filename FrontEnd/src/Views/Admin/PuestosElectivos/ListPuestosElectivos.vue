<template>
  <router-link to="/admin/opcciones" style="text-decoration: none;">
    <button class="btn btn-primary px-5 mt-2 py-1 ms-2">
      <img src="../../../assets/img/btn-regresar.png" />
    </button>
  </router-link>
  <div class="container-lg pb-4 mt-2" style="min-height: 80vh;">
    <h1 class="text-center p-2">PUESTO ELECTIVO</h1>
    <router-link to="/admin/puesto-electivo/add">
      <button class="btn btn-success p-2">Nuevo Puesto</button>
    </router-link>
    <table class="w-100 mt-3">
      <tbody class="w-100 border-bottom border-dark">
        <tr class="bg-secondary p-0 fs-4" style="width: 100%;">
          <th scope="col" class="border border-2 border-dark p-md-2">ID</th>
          <th scope="col" class="border border-2 border-dark p-md-2">Nombre</th>
          <th scope="col" class="border border-2 border-dark p-md-2">Descripcion</th>
          <th scope="col" class="border border-2 border-dark p-md-2">Estado</th>
          <th scope="col" class="border border-2 border-dark p-md-2">Acciones</th>
        </tr>

        <tr v-for="puesto in puestosElectivos" :key="puesto.Id" class="p-0 fs-5">
          <th class="border border-2 border-dark p-2">{{puesto.Id}}</th>
          <th class="border border-2 border-dark p-2">{{puesto.Nombre}}</th>
          <th class="border border-2 border-dark p-2">{{puesto.Descripcion}}</th>
          <th class="border border-2 border-dark p-2">{{puesto.Estado ? "Activo": "Inactivo"}}</th>
          <th class="border border-2 border-dark p-2 d-flex justify-content-center">
            <router-link v-if="puesto.Estado" :to="'/admin/puesto-electivo/edit/'+ puesto.Id">
              <button class="btn btn-warning">Editar</button>
            </router-link>
            <button
              v-on:click.prevent="DisableCiudadano(puesto.Id)"
              class="btn ms-2"
              :class="{ disable : !buttonDesactivarIsActive, 'btn-danger': puesto.Estado, 'btn-success': !puesto.Estado }"
            >{{puesto.Estado ? "Desactivar" : "Activar"}}</button>
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
    ...mapActions(["GetAllPuestosElectivos", "ChangeStatePuestosElectivos"]),
    DisableCiudadano(id) {
      this.ChangeStatePuestosElectivos(id);
      setTimeout(() => {
        this.GetAllPuestosElectivos();
      }, 30);
    },
  },
  mounted() {
    this.GetAllPuestosElectivos();
  },
  computed: mapState({
    puestosElectivos: (state) => state.modulePuestosElectivos.puestosElectivos,
  }),
};
</script>
