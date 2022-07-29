<template>
  <main>
    <form id="form" class="container border shadow bg-white w-50 mt-5 p-5" v-on:submit.prevent>
      <h1 class="p-2 text-center">Login</h1>
      <label class="fs-4" for="UserName">User Name</label>
      <input
        name="UserName"
        id="UserName"
        class="fs-4 form-control my-2 p-1"
        type="text"
        placeholder="User Name"
        v-model="UserName"
      />
      <label class="fs-4" for="Password">Password</label>
      <input
        name="Password"
        id="Password"
        class="fs-4 form-control my-2 p-1"
        type="password"
        placeholder="Password"
        v-model="Password"
      />
      <div class="d-flex m-0 mt-5 mb-2 justify-content-end">
        <button type="reset" class="fs-5 btn btn-warning px-5 mx-1">Clear</button>
        <button v-on:click="postForm" id="enviarLogin" class="fs-5 btn btn-primary px-5 mx-1">Login</button>
      </div>
    </form>
  </main>
</template>

<script>
export default {
  data() {
    return {
      UserName: "",
      Password: "",
    };
  },
  methods: {
    postForm() {
      console.log({
        UserName: this.UserName,
        Password: this.Password,
      });
      fetch("http://localhost:3001/login-admin", {
        headers: {
          "Content-Type": "application/json",
          // "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "POST",
        body: JSON.stringify({
          UserName: this.UserName,
          Password: this.Password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.Estado) {
            sessionStorage.setItem("token", data.token);
            this.$router.push("/admin/opcciones");
          }
        });
    },
  },
  mounted() {},
};
</script>

<style>
</style>
