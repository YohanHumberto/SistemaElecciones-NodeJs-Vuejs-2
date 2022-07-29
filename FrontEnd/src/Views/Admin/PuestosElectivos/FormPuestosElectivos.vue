<template>
  <router-link to="/admin/puesto-electivo">
    <button class="btn btn-primary mt-2 px-5 ms-2">
      <img src="../../../assets/img/btn-regresar.png" />
    </button>
  </router-link>
  <div class="container mt-5 d-flex justify-content-center">
    <form class="border shadow p-5 border border-dark w-50">
      <h2
        class="text-center mb-3"
      >{{ EditIsActive ? "Editar Puesto Electoral" : "Crear Puesto Electoral"}}</h2>
      <label>Nombre</label>
      <input
        class="form-control my-2"
        type="text"
        placeholder="Nombre"
        required="required"
        v-model="puestoElectivo.Nombre"
      />
      <label>Descripcion</label>
      <input
        class="form-control my-2"
        type="text"
        placeholder="Descripcion"
        required="required"
        v-model="puestoElectivo.Descripcion"
      />
      <input class="form-control" value="true" type="hidden" name="Estado" required="required" />
      <div class="d-flex justify-content-end">
        <button type="reset" class="btn btn-warning my-3 px-5">Limpiar</button>
        <button
          type="submit"
          class="btn btn-primary my-3 px-5 ms-2"
          v-on:click.prevent="validateForm()"
        >{{ EditIsActive ? "Editar" : "Crear" }}</button>
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
      "AddPuestosElectivos",
      "EditPuestosElectivos",
      "GetByIdPuestosElectivos",
    ]),
    validateForm() {
      if (
        this.puestoElectivo.Nombre != "" &&
        this.puestoElectivo.Descripcion != ""
      ) {
        this.EditIsActive
          ? this.EditPuestosElectivos(this.puestoElectivo)
          : this.AddPuestosElectivos(this.puestoElectivo);
        this.$router.push("/admin/puesto-electivo");
      }
    },
    verificarEditMode() {
      const res = this.$router.currentRoute._rawValue.fullPath.indexOf(
        "/admin/puesto-electivo/edit"
      );
      res != -1 ? (this.EditIsActive = true) : (this.EditIsActive = false);
    },
    async LoadEditMode() {
      const userId = this.$router.currentRoute._rawValue.params.id;
      console.log(userId);
      this.GetByIdPuestosElectivos(userId);
    },
  },
  mounted() {
    this.verificarEditMode();
    this.EditIsActive && this.LoadEditMode();
  },
  computed: mapState({
    puestoElectivo: (state) => state.modulePuestosElectivos.puestoElectivo,
  }),
};
</script>
