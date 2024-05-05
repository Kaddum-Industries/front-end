<!-- ActiveShift.vue -->
<template>
  <div class="active-shift-wrapper">
    <!-- Sidebar -->
    <aside class="sidebar">
      <h1 class="sidebar-title">Daily Track Sheet</h1>
      <ul class="sidebar-nav">
        <li><button @click="goHome" class="nav-btn">Home</button></li>
      </ul>
    </aside>

    <!-- Main Content -->
    <div class="main-content">
      <header class="top-header">
        <h1 class="header-title">Track Board</h1>
      </header>

      <!-- Notification Cards -->
      <div class="notification-cards">
        <div class="notification-card total-card">
          <div class="notification-text">
            <p>Total Shifts: {{ totalShifts }}</p>
          </div>
        </div>
        <div class="notification-card active-card">
          <div class="notification-text">
            <p>Active Shifts: {{ activeShifts }}</p>
          </div>
        </div>
        <div class="notification-card inactive-card">
          <div class="notification-text">
            <p>Inactive Shifts: {{ inactiveShifts }}</p>
          </div>
        </div>
      </div>

      <!-- Shift Dashboard -->
      <div class="collapsible-section gradient-1">
        <h2>
          Shift Dashboard 📅
          <span @click.stop="toggleSection('shift')" class="collapse-icon">
            <span v-if="visibleSections.shift">▼</span>
            <span v-else>▲</span>
          </span>
        </h2>
        <div v-show="visibleSections.shift">
          <div class="shift-action">
            <button class="add-shift-btn" @click="navigateToAddShift">Add Shift</button>
          </div>

          <div class="shift-table">
            <table>
              <thead>
                <tr>
                  <th style="width: 80px;">Employee ID</th>
                  <th style="width: 200px;">Name</th>
                  <th style="width: 150px;">Role</th>
                  <th style="width: 120px;">Start Time</th>
                  <th style="width: 150px;">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="shifts.length === 0">
                  <td colspan="5" class="no-shift-message">No active shifts available</td>
                </tr>
                <!-- Placeholder for employee shift data -->
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Machine Dashboard -->
      <div class="collapsible-section gradient-2">
        <h2>
          Machine Dashboard 🛠️
          <span @click.stop="toggleSection('machine')" class="collapse-icon">
            <span v-if="visibleSections.machine">▼</span>
            <span v-else>▲</span>
          </span>
        </h2>
        <div v-show="visibleSections.machine">
          <div class="machine-action">
            <button class="start-machine-btn" @click="navigateToStartMachine">Start Machine</button>
          </div>

          <div class="machine-table">
            <table>
              <thead>
                <tr>
                  <th style="width: 80px;">Machine ID</th>
                  <th style="width: 200px;">Name</th>
                  <th style="width: 300px;">Description</th>
                  <th style="width: 120px;">Start Time</th>
                  <th style="width: 150px;">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="machines.length === 0">
                  <td colspan="5" class="no-machine-message">No active machines available</td>
                </tr>
                <!-- Placeholder for machine shift data -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActiveShift',
  data() {
    return {
      visibleSections: {
        shift: true,
        machine: true
      },
      shifts: [],
      machines: [],
      totalShifts: 0,
      activeShifts: 0,
      inactiveShifts: 0
    };
  },
  methods: {
    goHome() {
      this.$router.push({ name: 'Dashboard' });
    },
    navigateToAddShift() {
      this.$router.push({ name: 'AddShift' });
    },
    navigateToStartMachine() {
      this.$router.push({ name: 'StartMachine' });
    },
    toggleSection(section) {
      this.visibleSections[section] = !this.visibleSections[section];
    }
  },
  mounted() {
    // Placeholder to fetch shifts and machines data, and update stats
    this.totalShifts = 0;
    this.activeShifts = 0;
    this.inactiveShifts = 0;
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

.notification-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

.notification-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* Stronger shadow for glossy effect */
  border-radius: 12px;
  padding: 15px;
  flex-basis: 200px;
  display: flex;
  align-items: center;
}

.total-card {
  background-image: linear-gradient(to bottom, #ff9999, #ffcccc); /* Light Red Gradient */
}

.active-card {
  background-image: linear-gradient(to bottom, #66b3ff, #99ccff); /* Light Blue Gradient */
}

.inactive-card {
  background-image: linear-gradient(to bottom, #ffcc66, #ffdd99); /* Light Orange Gradient */
}

.notification-text {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.collapsible-section {
  margin-top: 20px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
}

.gradient-1 {
  background: linear-gradient(90deg, #da7171, #a3b8f4); /* Light Pink Gradient */
}

.gradient-2 {
  background: linear-gradient(90deg, #da7171, #a3d7a4); /* Light Red Gradient */
}

.collapsible-section h2 {
  cursor: default;
  background: linear-gradient(90deg, #b20a0a, #f82929); /* Red to Lighter Red Gradient */
  color: white;
  padding: 10px;
  text-align: start;
  font-size: 15px;
  border-radius: 10px 10px 0 0;
  margin: 0;
}

.collapse-icon {
  cursor: pointer;
  float: right;
}



.shift-action, .machine-action {
  text-align: right;
  padding: 10px 20px;
}

.add-shift-btn, .start-machine-btn {
  padding: 10px;
  background: linear-gradient(90deg, #a41313, #e56b6b);
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-shift-btn:hover, .start-machine-btn:hover {
  background-color: #5db072;
}

.shift-table, .machine-table {
  padding: 20px;
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

.no-shift-message, .no-machine-message {
  text-align: center;
  font-weight: bold;
  color: #b91c1c;
  padding: 20px;
}

button {
  padding: 10px;
  background-color: #444;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #555;
}
</style>
