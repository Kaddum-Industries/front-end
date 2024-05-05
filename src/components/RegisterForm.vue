<template>
  <div class="register-form-wrapper">
    <header class="top-header">
      <div class="logo-container">
        <img src="../assets/kaddum-logo.png" alt="Kaddum Industries Logo" class="header-logo">
      </div>
      <h1 class="header-title">Kaddum Industries</h1>
    </header>

    <div id="signup-form" class="form-container">
      <h2>Register</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="user.name" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="user.email" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="user.password" required>
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" v-model="user.confirmPassword" required>
        </div>
        <div class="form-group">
          <label for="role">Role</label>
          <select id="role" v-model="user.role" required>
            <option disabled value="">Select</option>
            <option value="supervisor">Supervisor</option>
            <!-- Add more roles as needed -->
          </select>
        </div>
        <button type="submit" class="form-button">Register</button>
      </form>
      <div class="login-link">
      <p>Already Registered? <a href="#" @click="goToLogin">Login</a></p>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterForm',
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
      }
    };
  },
  methods: {
    submitForm() {
      console.log(this.user);
      // Add API call or other form submission logic here
    },
    goToLogin() {
      this.$router.push({ name: 'Login' });
    }
  }
};
</script>

<style scoped>
.register-form-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background: linear-gradient(to bottom, #f30404 0%, #e49191 100%);
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  margin-bottom: 0px;
}

.top-header {
  width: 100%;
  padding: 15px 0;
  color: white;
  text-align: center;
  margin-bottom: 0px;
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

.form-container {
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

.form-group input, .form-group select {
  width: 70%;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;
}

.form-group input:focus, .form-group select:focus {
  border-color: #a20505;
}

.form-button {
  background: linear-gradient(to right, #a20505, #d7bebe);
  color: white;
  padding: 8px;
  border-radius: 10px;
  width: 60%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
  margin-top: 10px;
  transition: all 0.3s ease;
}

.form-button:hover {
  transform: scale(1.1);
}

.sub-text {
  color: #333;
  text-decoration: underline;
  cursor: pointer;
  display: block;
  margin-top: 20px;
  width: 100%;
  text-align: center;
}
</style>
