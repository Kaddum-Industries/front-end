<template>
  <div class="dashboard-wrapper">
    <header class="top-header">
      <img src="../assets/kaddum-logo.png" alt="Kaddum Industries Logo" class="header-logo" />
      <h1 class="header-title">Kaddum Industries</h1>
    </header>

    <div class="content-wrapper">
      <aside class="sidebar">
        <div class="sidebar-user">Clinton</div>
        <div class="sidebar-menu">
          <div class="sidebar-item" @click="addProject">Add Project</div>
          <div class="sidebar-item" @click="addEmployee">Employee Register</div>
          <div class="sidebar-item" @click="addMachine">Machine Register</div>
          <div class="sidebar-item" @click="logout">Logout</div>
        </div>
      </aside>

      <div class="dashboard-content">
        <div class="menu-grid">
          <div class="menu-item" @click="navigateTo('DailyDiary')">Daily Diary</div>  <!-- Link to Daily Diary -->
          <div class="menu-item" @click="navigateTo('ActiveShift')">Daily Track Sheet</div>  <!-- Link to Active Shift -->
          <div class="menu-item" @click="navigateTo('CostingBreakdown')">Costing Breakdown</div>
          <div class="menu-item" @click="navigateTo('ExpenseClaimed')">Expense Claimed</div>
          <div class="menu-item" @click="navigateTo('ProjectCostTracker')">Project Cost Tracker</div>
          <div class="menu-item" @click="navigateTo('WeeklyReport')">Weekly Report</div>    
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectDashboard',
  methods: {
    navigateTo(section) {
      this.$router.push({ name: section });  // Navigate to the selected section
    },
    addProject() {
      console.log('Adding project');
    },
    addEmployee() {
      this.$router.push({ name: 'EmployeeManagement' });  // Navigate to Employee Management
    },
    addMachine() {
      this.$router.push({ name: 'MachineManagement' });  // Navigate to Machine Management
    },
    logout() {
      this.$router.push({ name: 'Login' });  // Navigate to the login screen
    },
  },
};
</script>

<style scoped>
.dashboard-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;  /* Fill the full screen height */
}

.top-header {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333;
  color: white;
  padding: 20px;
}

.header-logo {
  max-width: 100px;
  margin-right: 20px;
}

.header-title {
  font-size: 24px;
  color: white;
}

.content-wrapper {
  display: flex;
  flex-direction: row;
  flex-grow: 1;  /* Grow to fill the available space */
}

.sidebar {
  background-color: #333;
  color: white;
  padding: 20px;
  width: 200px;  /* Fixed width for the sidebar */
  min-width: 200px;
}

.sidebar-user {
  text-align: center;
  padding-bottom: 20px;
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.sidebar-item {
  background-color: #444;
  color: white;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
}

.sidebar-item:hover {
  background-color: #555;  /* Hover effect */
}

.dashboard-content {
  flex: 1;  /* Occupy remaining space */
  padding: 20px;  /* Ensure consistent spacing */
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);  /* Grid structure */
  gap: 40px;
}

.menu-item {
  background-color: #666;
  color: white;
  padding: 60px;  /* Adjust padding */
  border-radius: 20px;
  text-align: center;
  cursor: pointer;
}

.menu-item:hover {
  background-color: #555;  /* Hover effect */
}

/* Mobile view adjustments */
@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;  /* Vertical stacking for mobile */
  }

  .sidebar {
    width: 100%;  /* Full width for mobile */
    padding: 10px;
  }

  .menu-grid {
    grid-template-columns: repeat(1, 1fr);  /* Single column on mobile */
  }

  .menu-item {
    padding: 40px;  /* Reduced padding for smaller screens */
  }
}
</style>
