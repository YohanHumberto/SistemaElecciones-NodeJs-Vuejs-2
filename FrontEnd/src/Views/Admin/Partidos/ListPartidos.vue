<template>
  <router-link to="/admin/opcciones" style="text-decoration: none;">
    <button class="btn btn-primary px-5 mt-2 py-1 ms-2">
      <img src="../../../assets/img/btn-regresar.png" />
    </button>
  </router-link>
  <div class="container-lg pb-4 mt-2" style="min-height: 80vh;">
    <h1 class="text-center p-2">PARTIDOS</h1>
    <router-link to="/admin/partidos/add">
      <button class="btn btn-success p-2">Nuevo Partido</button>
    </router-link>
    <table class="w-100 mt-3">
      <tbody class="w-100 border-bottom border-dark">
        <tr class="bg-secondary p-0 fs-4" style="width: 100%;">
          <th scope="col" class="border border-2 border-dark p-md-2">ID</th>
          <th scope="col" class="border border-2 border-dark p-md-2">Nombre</th>
          <th scope="col" class="border border-2 border-dark p-md-2">Descripcion</th>
          <th scope="col" class="border border-2 border-dark p-md-2">Logo</th>
          <th scope="col" class="border border-2 border-dark p-md-2">Estado</th>
          <th scope="col" class="border border-2 border-dark p-md-2">Acciones</th>
        </tr>
        <tr v-for="partido in partidos" :key="partido.Id" class="p-0 fs-5">
          <th class="border border-2 border-dark p-2">{{partido.Id}}</th>
          <th class="border border-2 border-dark p-2">{{partido.Nombre}}</th>
          <th class="border border-2 border-dark p-2">{{partido.Descripcion}}</th>
          <th class="border border-2 border-dark p-2" style="max-height: 1rem; max-width: 1rem">
            <img :src="partido.Logo" alt="logo" style="height: 100%; width: 100%" />
          </th>
          <th class="border border-2 border-dark p-2">{{partido.Estado ?"Activo" : "Inactivo"}}</th>
          <th class="border border-2 border-dark p-2">
            <router-link v-if="partido.Estado" :to="'/admin/partidos/edit/'+ partido.Id">
              <button class="btn btn-warning">Editar</button>
            </router-link>
            <button
              v-on:click.prevent="DisableCiudadano(partido.Id)"
              class="btn ms-2"
              :class="{ disable : !buttonDesactivarIsActive, 'btn-danger': partido.Estado, 'btn-success': !partido.Estado }"
            >{{partido.Estado ? "Desactivar" : "Activar"}}</button>
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
    ...mapActions(["GetAllPartidos", "ChangeStatePartidos"]),
    DisableCiudadano(id) {
      this.ChangeStatePartidos(id);
      setTimeout(() => {
        this.GetAllPartidos();
      }, 10);
    },
  },
  mounted() {
    this.GetAllPartidos();
  },
  computed: mapState({
    partidos: (state) => state.modulePartidos.partidos,
  }),
};
</script>
