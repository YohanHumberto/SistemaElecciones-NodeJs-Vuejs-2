<template>
  <router-link to="/admin/elecciones" style="text-decoration: none;">
    <button class="btn btn-primary px-5 mt-2 py-1 ms-2">
      <img src="../../../assets/img/btn-regresar.png" />
    </button>
  </router-link>
  <div class="container p-5">
    <div>
      <table
        v-for="Resultado in Resultados"
        :key="Resultado.Id"
        class="w-100 border border-dark mb-2"
      >
        <thead class="alert-secondary p-3 w-100 fs-5">
          <tr>
            <th colspan="3">
              <h1 class="p-2 h3 text-center bg-dark text-white mb-0">{{Resultado.Nombre}}</h1>
            </th>
          </tr>
          <tr class="w-100 m-0">
            <th class="p-3 border border-dark border-2">Candidatos</th>
            <th class="p-3 border border-dark border-2">Cantidad de Votos</th>
            <th class="p-3 border border-dark border-2">Porcentaje</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="candidato in Resultado.candidatos"
            :key="candidato.Id"
            class="border border-dark border-2"
          >
            <th class="p-3 border border-dark border-2">{{candidato.Nombre}}</th>
            <th class="p-3 border border-dark border-2">{{candidato.CantidadDeVotos}}</th>
            <th
              class="p-3 border border-dark border-2"
            >{{(candidato.CantidadDeVotos / Resultado.TotalVotosPorPuesto) *100}}%</th>
          </tr>
          <tr class="border border-dark border-2 alert-info">
            <th class="p-3 border border-dark border-2">
              <b>Totales</b>
            </th>
            <th class="p-3 border border-dark border-2">{{Resultado.TotalVotosPorPuesto}}</th>
            <th class="p-3 border border-dark border-2">100%</th>
          </tr>
        </tbody>
      </table>
    </div>
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
    ...mapActions(["GetResultadosEleccionesById"]),
    GetData() {
      const IdEleccion = this.$router.currentRoute._rawValue.params.id;
      this.GetResultadosEleccionesById(IdEleccion);
    },
  },
  mounted() {
    this.GetData();
  },
  computed: mapState({
    Resultados: (state) => state.moduleElecciones.Resultados,
  }),
};
</script>

<style>
</style>