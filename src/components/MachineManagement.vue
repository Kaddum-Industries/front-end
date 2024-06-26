<template>
  <div class="machine-management-wrapper">
    <!-- Sidebar -->
    <aside class="sidebar">
      <h1 class="sidebar-title">Machine Management</h1>
      <ul class="sidebar-nav">
        <li><button @click="goBack" class="nav-btn">Home</button></li>
      </ul>
    </aside>

    <!-- Main Content -->
    <div class="main-content">
      <header class="top-header">
        <div class="header-buttons">
          <button class="add-machine-btn" @click="addMachine">Add Machine</button>
        </div>
      </header>

      <!-- Machine Table -->
      <div class="machine-table">
        <table>
          <thead>
            <tr>
              <th style="width: 80px;">Machine ID</th>
              <th style="width: 200px;">Name</th>
              <th style="width: 300px;">Description</th>
              <th style="width: 100px;">Status</th>
              <th style="width: 150px;">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="machines.length === 0">
              <td colspan="5" class="no-machines-message">No machines to show</td>
            </tr>
            <tr v-for="machine in machines" :key="machine.id">
              <td>{{ machine.id }}</td>
              <td>{{ machine.name }}</td>
              <td>{{ machine.description }}</td>
              <td>
                <span v-if="machine.status === 'ACTIVE'" class="status-active">🟢 ACTIVE</span>
                <span v-if="machine.status === 'INACTIVE'" class="status-inactive">🔴 INACTIVE</span>
              </td>
              <td>
                <button @click="editMachine(machine)">Edit</button>
                <button @click="deleteMachine(machine.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'machine-management',
  data() {
    return {
      machines: []
    };
  },
  methods: {
    fetchMachines() {
      const storedMachines = JSON.parse(localStorage.getItem('machinesData')) || [];
      this.machines = storedMachines;
    },
    addMachine() {
      localStorage.removeItem('editMachine');
      this.$router.push({ name: 'AddMachine' });
    },
    editMachine(machine) {
      localStorage.setItem('editMachine', JSON.stringify(machine));
      this.$router.push({ name: 'AddMachine' });
    },
    deleteMachine(id) {
      this.machines = this.machines.filter(machine => machine.id !== id);
      localStorage.setItem('machinesData', JSON.stringify(this.machines));
      console.log('Deleted machine with ID:', id);
    },
    goBack() {
      this.$router.push({ name: 'Dashboard' });
    }
  },
  mounted() {
    this.fetchMachines();
  }
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

.header-buttons {
  display: flex;
  gap: 10px;
}

.add-machine-btn {
  background-color: #b91c1c;
  color: white;
  padding: 10px;
  border-radius: 8px;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-machine-btn:hover {
  background-color: #a11616;
}

/* Machine Table */
.machine-table {
  margin-top: 20px;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  overflow: hidden;
  min-height: 200px; /* Minimum height for the table */
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border: 1px solid #ccc;
}

th {
  background: linear-gradient(90deg, #b20a0a, #f82929); /* Red to Lighter Red Gradient */
  color: white;
}

td {
  background-color: #f9f9f9;
}

.no-machines-message {
  text-align: center;
  font-weight: bold;
  color: #b91c1c;
  padding: 20px;
}

.status-active {
  color: green;
  font-weight: bold;
}

.status-inactive {
  color: red;
  font-weight: bold;
}

button {
  padding: 10px;
  background-color: #444;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #555;
}
</style>
