<template>
  <div class="login-wrapper">
    <header class="top-header">
      <div class="logo-container">
        <img src="../assets/kaddum-logo.png" alt="Kaddum Industries Logo" class="header-logo">
      </div>
      <h1 class="header-title">Kaddum Industries</h1>
    </header>

    <div class="login-form">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" v-model="password" required>
        </div>
        <button type="submit" class="login-button">Login</button>
        <a href="#" class="forgot-password">Forgot Password?</a>
        <button @click="register" class="register-button">Register</button>
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
    register() {
      // Placeholder for register method
      this.$router.push({ name: 'RegisterForm' });  // Redirect to the registration page
    },
  },
};
</script>

<style scoped>
.login-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background: linear-gradient(to bottom, #f30404 0%, #e49191 100%);
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.top-header {
  width: 100%;
  padding: 15px 0;
  color: white;
  text-align: center;
  margin-bottom: 1px;
}

.logo-container {
  display: inline-block;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.header-logo {
  height: 60px;
}

.header-title {
  font-size: 32px;
  font-weight: bold;
  text-shadow: 2px 2px 4px #000;
}

.login-form {
  background-color: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  width: 350px;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.9));
}

.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.form-group label {
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
}

.form-group input {
  width: 70%;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;
}

.form-group input:focus {
  border-color: #a20505;
}

.login-button, .register-button {
  background: linear-gradient(to right, #a20505, #d7bebe);
  color: white;
  padding: 8px;
  border-radius: 10px;
  width: 60%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
  margin-top: 10px;
  transition: all 0.3s ease; /* Enhanced transition for all properties */
}

.login-button:hover, .register-button:hover {
  transform: scale(1.1); /* More noticeable hover effect */
}

.forgot-password {
  color: #333;
  text-decoration: underline;
  cursor: pointer;
  display: block;
  margin-top: 20px;
  width: 100%;
  text-align: center;
}

.error {
  color: red;
  margin-top: 10px;
  font-size: 14px;
}
</style>

