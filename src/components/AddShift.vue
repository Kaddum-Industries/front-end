<!-- AddShift.vue -->
<template>
  <div class="add-shift-wrapper">
    <!-- Sidebar -->
    <aside class="sidebar">
      <h1 class="sidebar-title">Daily Track Sheet</h1>
      <ul class="sidebar-nav">
        <li><button @click="goBack" class="nav-btn">Back</button></li>
      </ul>
    </aside>

    <!-- Main Content -->
    <div class="main-content">
      <header class="top-header">
        <h1 class="header-title">Add Shift</h1>
      </header>

      <!-- Form Container -->
      <div class="form-container">
        <form @submit.prevent="submitShift">
          <div class="form-group">
            <label for="employee-name">Employee Name:</label>
            <select v-model="selectedEmployee" required>
              <option value="" disabled>Select Employee</option>
              <option
                v-for="employee in employeeNames"
                :key="employee"
                :value="employee"
              >
                {{ employee }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="role">Role:</label>
            <select v-model="selectedRole" required>
              <option value="" disabled>Select Role</option>
              <option
                v-for="role in roles"
                :key="role"
                :value="role"
              >
                {{ role }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="shift-start-time">Start Time:</label>
            <input
              type="time"
              v-model="shiftStartTime"
              step="1"
              required
            />
          </div>

          <div class="form-buttons">
            <button type="submit" class="submit-btn">Submit</button>
            <button type="button" class="cancel-btn" @click="goBack">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from 'vue';

export default {
  name: 'AddShift',
  setup() {
    const { proxy } = getCurrentInstance();
    const employeeNames = ref([]);
    const selectedEmployee = ref(null);
    const roles = ref(['Supervisor', 'Operator', 'Assistant']);
    const selectedRole = ref('');
    const shiftStartTime = ref(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));

    const goBack = () => {
      proxy.$router.push({ name: 'ActiveShift' });
    };

    const submitShift = () => {
      console.log('New shift added');
    };

    const loadEmployeeNames = () => {
      const storedEmployees = JSON.parse(localStorage.getItem('employeesData'));

      if (Array.isArray(storedEmployees)) {
        employeeNames.value = storedEmployees.map((emp) => emp.name);
      }
    };

    onMounted(loadEmployeeNames);

    return {
      employeeNames,
      selectedEmployee,
      roles,
      selectedRole,
      shiftStartTime,
      goBack,
      submitShift,
    };
  },
};
</script>

<style scoped>
/* Sidebar Styling */
.sidebar {
  background-color: #b91c1c; /* Deep Red */
  color: white;
  width: 200px;
  min-height: 100vh;
  position: fixed;
  box-shadow: 4px 0 8px rgba(0, 0, 0, 0.3);
  padding: 20px;
  box-sizing: border-box;
}

.sidebar-title {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
}

.sidebar-nav {
  list-style: none;
  padding: 0;
}

.nav-btn {
  background-color: transparent;
  color: white;
  border: none;
  width: 100%;
  text-align: left;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.nav-btn:hover {
  background-color: #a11616;
}

/* Main Content Area */
.main-content {
  margin-left: 220px; /* Space for the sidebar */
  padding: 20px;
  font-size: 13px;
}

.top-header {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #f8f9fa;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 10px;
}

.form-container {
  margin-top: 20px;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  color: #333;
  text-align: start;
  margin-bottom: 5px;
}

input, select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.form-buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  margin-top: 20px;
}

.submit-btn, .cancel-btn {
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.submit-btn {
  background-color: #4CAF50;
  color: white;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #45a049;
}

.cancel-btn {
  background-color: #f44336;
  color: white;
  transition: background-color 0.3s;
}

.cancel-btn:hover {
  background-color: #d32f2f;
}
</style>
