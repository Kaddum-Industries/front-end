<template>
  <div class="login-wrapper">
    <img src="../assets/kaddum-logo.png" alt="Kaddum Industries Logo" class="logo">
    <h1 class="header">Kaddum Industries</h1>
    <div class="login-form">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            v-model="email"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            v-model="password"
            required
          />
        </div>
        <button type="submit" class="login-button">Login</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginScreen",
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    handleLogin() {
      if (this.email === 'clinton@abc.com' && this.password === '12345678') {
        this.$router.push({ name: 'Dashboard' });  // Redirect to the dashboard
      } else {
        this.errorMessage = "Invalid username or password.";
      }
    },
  },
};
</script>

<style scoped>
.login-wrapper {
  text-align: center;
  padding: 20px;
}

.header {
  background-color: #333;
  color: white;
  padding: 20px;
}

.login-form {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
}

.form-group {
  margin-bottom: 15px;
}

.login-button {
  background-color: #333;
  color: white;
  padding: 10px;
  border-radius: 5px;
}

.error {
  color: red;
}

.logo {
  max-width: 200px;
  margin-bottom: 20px;
}
</style>
