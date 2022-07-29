<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand">NavBar</a>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li v-if="LoginElector" class="nav-item">
            <a class="nav-link" href="/puestos-electorales{{Elector.DocumentoDeIdentidad}}">
              Puestos
              Electorales
            </a>
          </li>
          <li v-else-if="Login" class="nav-item">
            <a class="nav-link" href="/admin/opcciones">Admin Options</a>
          </li>
          <li v-else class="nav-item">
            <a class="nav-link" href="/elector-login">Home</a>
          </li>
        </ul>
      </div>
      <a v-if="LoginElector" class="nav-link active" aria-current="page" href="/logout-elector">
        <button class="btn btn-danger">Logout Elector</button>
      </a>
      <a v-else-if="Login" class="nav-link active" aria-current="page" href="/admin/logout-admin">
        <button class="btn btn-danger">Logout Admin</button>
      </a>
      <a v-else class="nav-link active" aria-current="page" href="/admin-login">
        <button class="btn btn-primary">Admin Login</button>
      </a>
    </div>
  </nav>

  <main>
    <div class="d-flex justify-content-center mt-5 w-75 m-auto" v-if="hasErrorMessages">
      <div id="alert" class="col-8 alert alert-danger fs-4">
        <b>Alerts!!</b>
        <span class="ms-3">{{errorMessages}}</span>
        <img
          onload="disableAlert()"
          src="https://d500.epimg.net/cincodias/imagenes/2018/11/13/lifestyle/1542113135_776401_1542116070_noticia_normal.jpg"
          class="d-none"
        />
      </div>
    </div>

    <router-view></router-view>
  </main>
</template>

<script>
export default {
  props: [
    "LoginElector",
    "Login",
    "hasErrorMessages",
    "errorMessages",
    "Elector",
  ],
};
</script>

<style>
</style>