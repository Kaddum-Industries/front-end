<template>
    <div class="add-shift-wrapper">
      <header class="top-header">
        <h1 class="header-title">Add Shift</h1>
        <button class="back-button" @click="goBack">Back to Active Shifts</button>
      </header>
  
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
            <button type="submit">Add Shift</button>
            <button type="button" @click="goBack">Cancel</button>
          </div>
        </form>
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
        const storedEmployees = JSON.parse(localStorage.getItem('employeeData'));
  
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
  .add-shift-wrapper {
    padding: 20px;
  }
  
  .top-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #333;
    color: white;
    padding: 20px;
  }
  
  .header-title {
    font-size: 24px;
  }
  
  .back-button {
    padding: 10px;
    background-color: #444;
    color: white;
    border-radius: 10px;
    cursor: pointer;
  }
  
  .back-button:hover {
    background-color: #555;
  }
  
  .form-container {
    padding: 25px;
  }
  
  .form-group {
    margin-bottom: 30px;  /* Larger margin for larger input fields */
  }
  
  input, select {
    padding: 15px;  /* Increase padding for larger input fields */
    border-radius: 10px;  /* Larger border radius */
    border: 1px solid #ccc;
  }
  
  .form-buttons {
    display: flex;
    justify-content: center;  /* Align buttons in the center */
    gap: 10px;  /* Space between Submit and Cancel */
  }
  
  button {
    padding: 15px;  /* Increase button padding */
    background-color: #444;
    color: white;
    border-radius: 10px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #555;  /* Hover effect */
  }
  </style>
  