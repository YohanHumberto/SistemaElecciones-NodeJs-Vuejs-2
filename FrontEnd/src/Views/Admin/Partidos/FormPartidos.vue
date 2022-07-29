<template>
  <router-link to="/admin/partidos">
    <button class="btn btn-primary mt-2 px-5 ms-2">
      <img src="../../../assets/img/btn-regresar.png" />
    </button>
  </router-link>
  <div class="container mt-5 d-flex justify-content-center">
    <form class="border shadow p-5 border border-dark w-50">
      <h2 class="text-center mb-3">{{ EditIsActive ? "Editar Partido" : "Agregar Partido" }}</h2>
      <label for>Nombre</label>
      <input
        class="form-control my-2"
        type="text"
        placeholder="Nombre"
        required="required"
        v-model="partido.Nombre"
      />
      <label for>Descripcion</label>
      <input
        class="form-control my-2"
        type="text"
        placeholder="Descripcion"
        required="required"
        v-model="partido.Descripcion"
      />
      <label for>Logo del partido</label>
      <input class="form-control my-2" type="file" required="required" />
      <input class="form-control" value="true" type="hidden" name="Estado" required="required" />

      <div class="d-flex justify-content-end">
        <button type="reset" class="btn btn-warning my-3 px-5">Limpiar</button>
        <button
          v-on:click.prevent="validateForm()"
          type="submit"
          class="btn btn-primary my-3 px-5 ms-2"
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
    ...mapActions(["AddPartidos", "EditPartidos", "GetByIdPartidos"]),
    validateForm() {
      if (this.partido.Nombre != "" && this.partido.Descripcion != "") {
        this.EditIsActive
          ? this.EditPartidos(this.partido)
          : this.AddPartidos(this.partido);
        this.$router.push("/admin/partidos");
      }
    },
    verificarEditMode() {
      const res = this.$router.currentRoute._rawValue.fullPath.indexOf(
        "/admin/partidos/edit"
      );
      res != -1 ? (this.EditIsActive = true) : (this.EditIsActive = false);
    },
    async LoadEditMode() {
      const userId = this.$router.currentRoute._rawValue.params.id;
      console.log(userId);
      this.GetByIdPartidos(userId);
    },
  },
  mounted() {
    this.verificarEditMode();
    this.EditIsActive && this.LoadEditMode();
  },
  computed: mapState({
    partido: (state) => state.modulePartidos.partido,
  }),
};
</script>

<style>
</style>