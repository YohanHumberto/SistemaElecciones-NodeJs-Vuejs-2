<template>
  <div class="container-lg shadow border px-4 pb-4 mt-5">
    <h1 class="p-3 text-center">Puestos Electorales</h1>
    <div class="row m-0">
      <a
        v-for="puesto in puestos"
        :key="puesto.Id"
        class="col-12 col-sm-6 col-md-3 p-1"
        :href="!Completado && `/puestos-electorales/candidatos${puesto.Id}/${puesto.DIdentidad}`"
      >
        <div class="w-100 h-100">
          <button
            style="min-height: 15rem;"
            :class="'btn btn-outline-dark border border-dark  w-100' + !Estado && 'disabled' + 'button'"
            :disabled="Completado"
          >
            <h5 class="w-100 text-center">{{Nombre}}</h5>
            <p>{{Descripcion}}</p>
          </button>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      Completado: true,
    };
  },
  methods: {
    ...mapActions(["GetByDIdentidadPuestosElectivos"]),
  },
  mounted() {
    this.GetByDIdentidadPuestosElectivos();
  },
  computed: {
    ...mapState({
      puestos: (state) => state.modulePuestosElectivos.puestos,
    }),
  },
};
</script>


    <style>
.button {
  height: 15rem;
  width: 15rem;
  max-width: 30rem;
  border: none;
  max-width: 40rem;
  background: rgb(231, 230, 230);
}

.button:hover {
  background-color: rgb(163, 161, 161);
}
</style>