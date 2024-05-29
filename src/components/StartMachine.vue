<template>
  <div class="start-machine-wrapper">
    <!-- Sidebar -->
    <aside class="sidebar">
      <h1 class="sidebar-title">Active Shifts</h1>
      <ul class="sidebar-nav">
        <li><button @click="goBack" class="nav-btn">Back</button></li>
      </ul>
    </aside>

    <!-- Main Content -->
    <div class="main-content">
      <header class="top-header">
        <h1 class="header-title">Start Machine</h1>
      </header>

      <!-- Form Container -->
      <div class="form-container">
        <form @submit.prevent="submitMachine">
          <div class="form-group">
            <label for="project-name">Project Name:</label>
            <select id="project-name" v-model="selectedProject" required>
              <option value="" disabled>Select Project</option>
              <option v-for="project in projects" :key="project.id" :value="project">
                {{ project.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="machine-name">Machine Name:</label>
            <select id="machine-name" v-model="selectedMachine" required>
              <option value="" disabled>Select Machine</option>
              <option v-for="machine in machines" :key="machine.id" :value="machine">
                {{ machine.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="description">Description:</label>
            <input type="text" id="description" v-model="description" placeholder="Enter description">
          </div>

          <div class="form-group">
            <label for="start-time">Start Time:</label>
            <input
              id="start-time"
              type="time"
              v-model="startTime"
              required
            />
          </div>

          <div class="form-buttons">
            <button type="submit" class="submit-btn">Start Machine</button>
            <button type="button" @click="goBack" class="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from 'vue';

export default {
  name: 'StartMachine',
  setup() {
    const { proxy } = getCurrentInstance();
    const projects = ref([]);
    const machines = ref([]);
    const selectedProject = ref(null);
    const selectedMachine = ref(null);
    const description = ref('');
    const startTime = ref(new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }));

    const goBack = () => {
      proxy.$router.push({ name: 'ActiveShift' });
    };

    const submitMachine = () => {
      const newMachineOperation = {
        id: Date.now(), // Ensure each machine operation has a unique ID
        projectName: selectedProject.value.name,
        machineName: selectedMachine.value.name,
        description: description.value,
        startTime: startTime.value
      };

      // Save the new machine operation data to local storage
      const existingMachines = JSON.parse(localStorage.getItem('machineOperationsData')) || [];
      existingMachines.push(newMachineOperation);
      localStorage.setItem('machineOperationsData', JSON.stringify(existingMachines));

      console.log('Machine operation added:', newMachineOperation);
      goBack(); // Optionally navigate back after submission
    };

    const loadMachines = () => {
      const storedMachines = JSON.parse(localStorage.getItem('machinesData')) || [];
      machines.value = storedMachines.filter(machine => machine.id && machine.name);
    };

    const loadProjects = () => {
      const storedProjects = JSON.parse(localStorage.getItem('projectsData'));
      if (storedProjects) {
        projects.value = storedProjects.map(proj => ({ name: proj.name, id: proj.id }));
      }
    };

    onMounted(() => {
      loadMachines();
      loadProjects();
    });

    return {
      projects,
      machines,
      selectedProject,
      selectedMachine,
      description,
      startTime,
      goBack,
      submitMachine,
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
