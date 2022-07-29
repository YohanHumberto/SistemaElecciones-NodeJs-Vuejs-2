<template>
  <main class="container mt-5">
    <div class="row justify-content-center">
      <form class="w-50 mt-5 shadow p-5 pt-4">
        <h1 class="text-center mb-5">FORMULARIO</h1>
        <label class="my-3 mb-2 fs-4" for="DIdentidad">Documento De Identidad</label>
        <input
          class="form-control fs-4"
          type="text"
          v-model="DIdentidad"
          id="DIdentidad"
          placeholder="Ingrese Su Documento De Identidad"
        />
        <div class="d-flex justify-content-end mt-2">
          <button v-on:click.prevent="postForm()" class="btn btn-primary my-3 px-5 fs-4">Enviar</button>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      DIdentidad: "",
    };
  },
  methods: {
    ...mapActions(["LoginElector"]),
    postForm() {
      this.LoginElector({ DIdentidad: this.DIdentidad });
      this.$router.push("/elector/puestos-electivos");
    },
  },
  mounted() {},
};
</script>

<style>
</style>
