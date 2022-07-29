<template>
  <router-link to="/admin/ciudadanos">
    <button class="btn btn-primary mt-2 px-5 ms-2">
      <img src="../../../assets/img/btn-regresar.png" />
    </button>
  </router-link>
  <div class="container mt-5 d-flex justify-content-center">
    <form class="border shadow p-5 border border-dark w-50">
      <h2 class="text-center mb-3">Form</h2>
      <label for>Documento de identidad</label>
      <input
        class="form-control my-2"
        type="text"
        placeholder="Documento de identidad"
        required="required"
        v-model="ciudadano.DocumentoDeIdentidad"
        :disabled="EditIsActive"
      />
      <label for>Nombre</label>
      <input
        class="form-control my-2"
        type="text"
        placeholder="Nombre"
        required="required"
        v-model="ciudadano.Nombre"
      />
      <label for>Apellido</label>
      <input
        class="form-control my-2"
        type="text"
        placeholder="Apellido"
        required="required"
        v-model="ciudadano.Apellido"
      />
      <label for>Email</label>
      <input
        class="form-control my-2"
        type="text"
        name="Email"
        placeholder="Email"
        required="required"
        v-model="ciudadano.Email"
      />
      <input class="form-control" value="true" type="hidden" name="Estado" required="required" />
      <div class="d-flex justify-content-end">
        <button type="reset" class="btn btn-warning my-3 px-5">Limpiar</button>
        <button
          type="submit"
          class="btn btn-primary my-3 px-5 ms-2"
          v-on:click.prevent="validateForm()"
        >{{ EditIsActive ? "Editar" : "Crear"}}</button>
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
    ...mapActions(["AddCiudadanos", "EditCiudadanos", "GetByIdCiudadanos"]),
    validateForm() {
      if (
        this.ciudadano.DocumentoDeIdentidad != "" &&
        this.ciudadano.Nombre != "" &&
        this.ciudadano.Apellido != "" &&
        this.ciudadano.Email != ""
      ) {
        this.EditIsActive
          ? this.EditCiudadanos(this.ciudadano)
          : this.AddCiudadanos(this.ciudadano);
        this.$router.push("/admin/ciudadanos");
      }
    },
    verificarEditMode() {
      const res = this.$router.currentRoute._rawValue.fullPath.indexOf(
        "/admin/ciudadanos/edit"
      );
      res != -1 ? (this.EditIsActive = true) : (this.EditIsActive = false);
    },
    async LoadEditMode() {
      const userId =
        this.$router.currentRoute._rawValue.params.DocumentoDeIdentidad;
      this.GetByIdCiudadanos(userId);
    },
  },
  mounted() {
    this.verificarEditMode();
    this.EditIsActive && this.LoadEditMode();
  },
  computed: mapState({
    ciudadano: (state) => state.moduleCiudadanos.ciudadano,
  }),
};
</script>

<style>
</style>