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
            <label for="project-name">Project Name:</label>
            <select id="project-name" v-model="projectName" required>
              <option value="" disabled>Select Project</option>
              <option
                v-for="project in projectNames"
                :key="project"
                :value="project"
              >
                {{ project }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="employee-name">Employee Name:</label>
            <select id="employee-name" v-model="selectedEmployee" required>
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
            <select id="role" v-model="selectedRole" required>
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
              id="shift-start-time"
              type="time"
              v-model="shiftStartTime"
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
    const shiftStartTime = ref(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    const projectNames = ref([]); // State to store project names
    const projectName = ref('');  // State for selected project name

    const goBack = () => {
      proxy.$router.push({ name: 'ActiveShift' });
    };

    const submitShift = () => {
      const newShift = {
        id: Date.now(), // Ensure each shift has a unique ID
        projectName: projectName.value,
        employee: selectedEmployee.value,
        role: selectedRole.value,
        startTime: shiftStartTime.value
      };

      // Store the shift data in localStorage
      const existingShifts = JSON.parse(localStorage.getItem('shiftsData')) || [];
      existingShifts.push(newShift);
      localStorage.setItem('shiftsData', JSON.stringify(existingShifts));

      console.log('New shift added:', newShift);
      goBack(); // Optionally navigate back after submission
    };

    const loadEmployeeNames = () => {
      const storedEmployees = JSON.parse(localStorage.getItem('employeesData'));
      if (Array.isArray(storedEmployees)) {
        employeeNames.value = storedEmployees.map((emp) => emp.name);
      }
    };

    const loadProjectNames = () => {
      const storedProjects = JSON.parse(localStorage.getItem('projectsData'));
      if (Array.isArray(storedProjects)) {
        projectNames.value = storedProjects.map((proj) => proj.name);
      }
    };

    onMounted(() => {
      loadEmployeeNames();
      loadProjectNames();
    });

    return {
      employeeNames,
      selectedEmployee,
      roles,
      selectedRole,
      shiftStartTime,
      projectNames,
      projectName,
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
