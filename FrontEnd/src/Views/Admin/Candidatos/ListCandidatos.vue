<template>
  <router-link to="/admin/opcciones" style="text-decoration: none;">
    <button class="btn btn-primary px-5 mt-2 py-1 ms-2">
      <img src="../../../assets/img/btn-regresar.png" />
    </button>
  </router-link>
  <div class="container-lg pb-4 mt-2" style="min-height: 80vh;">
    <h1 class="text-center p-2">CANDIDATOS</h1>
    <router-link v-if="AgregarIsActive" to="/admin/candidatos/add">
      <button class="btn btn-success p-2">Nuevo Candidato</button>
    </router-link>
    <table class="w-100 mt-3">
      <tbody class="w-100 border-bottom border-dark">
        <tr class="bg-secondary p-0 fs-5" style="width: 100%;">
          <th scope="col" class="border border-2 border-dark p-md-2">ID</th>
          <th scope="col" class="border border-2 border-dark p-md-2">Nombre</th>
          <th scope="col" class="border border-2 border-dark p-md-2">Apellido</th>
          <th scope="col" class="border border-2 border-dark p-md-2">Partido</th>
          <th scope="col" class="border border-2 border-dark p-md-2">Puesto</th>
          <th scope="col" class="border border-2 border-dark p-md-2">Foto</th>
          <th scope="col" class="border border-2 border-dark p-md-2">Estado</th>
          <th scope="col" class="border border-2 border-dark p-md-2">Acciones</th>
        </tr>

        <tr v-for="candidato in candidatos" :key="candidato.Id" class="p-0">
          <th class="border border-2 border-dark p-2">{{candidato.Id}}</th>
          <th class="border border-2 border-dark p-2">{{candidato.Nombre}}</th>
          <th class="border border-2 border-dark p-2">{{candidato.Apellido}}</th>
          <th class="border border-2 border-dark p-2">{{candidato.partidoId}}</th>
          <th class="border border-2 border-dark p-2">{{candidato.puestoElectivoId}}</th>
          <th class="border border-2 border-dark p-2" style="max-height: 2.5rem; max-width: 2.5rem">
            <img :src="candidato.Foto" alt="img" style="height: 100%; width: 100%" />
          </th>
          <th class="border border-2 border-dark p-2">
            {{candidato.Estado ? "Activo" : "Inactivo"}}
            <!-- {{#if candidato.Estado}}Activo{{else}}Inactivo{{/if}} -->
          </th>
          <th class="border border-2 border-dark p-2">
            <router-link v-if="candidato.Estado" :to="'candidatos/edit' + candidato.Id">
              <button class="btn btn-warning">Editar</button>
            </router-link>
            <button
              v-on:click.prevent="DisableCandidato(candidato.Id)"
              class="btn ms-2"
              :class="{ 'disable' : !buttonDesactivarIsActive, 'btn-danger': candidato.Estado, 'btn-success': !candidato.Estado }"
            >{{candidato.Estado ? "Desactivar" : "Activar"}}</button>
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
      AgregarIsActive: true,
      buttonDesactivarIsActive: false,
    };
  },
  methods: {
    ...mapActions(["GetAllCandidatos", "ChangeStateCandidatos"]),
    DisableCandidato(Id) {
      this.ChangeStateCandidatos(Id);
      this.GetAllCandidatos();
    },
  },
  mounted() {
    this.GetAllCandidatos();
  },
  computed: mapState({
    candidatos: (state) => state.moduleCandidatos.candidatos,
  }),
};
</script>

<style>
</style>