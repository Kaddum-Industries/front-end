<template>
  <div class="add-machine-wrapper">
    <!-- Sidebar -->
    <aside class="sidebar">
      <h1 class="sidebar-title">Machine Management</h1>
      <ul class="sidebar-nav">
        <li><button @click="goBack" class="nav-btn">Back</button></li>
      </ul>
    </aside>

    <!-- Main Content -->
    <div class="main-content">
      <header class="top-header">
        <h1 class="header-title">Add Machine</h1>
      </header>

      <!-- Form Container -->
      <div class="form-container">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Name:</label>
            <input
              type="text"
              v-model="name"
              placeholder="Enter machine name"
              required
            />
          </div>

          <div class="form-group">
            <label for="description">Description:</label>
            <input
              type="text"
              v-model="description"
              placeholder="Enter machine description"
              required
            />
          </div>

          <div class="form-group">
            <label for="status">Status:</label>
            <select v-model="status" required>
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
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
export default {
  name: 'add-machine',
  data() {
    const editMachine = JSON.parse(localStorage.getItem('editMachine')) || {};
    return {
      id: editMachine.id || null,
      name: editMachine.name || '',
      description: editMachine.description || '',
      status: editMachine.status || 'ACTIVE',
    };
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'MachineManagement' });
    },
    submitForm() {
      let machines = JSON.parse(localStorage.getItem("machinesData")) || [];
      const newMachine = {
        id: this.id || Date.now(),
        name: this.name,
        description: this.description,
        status: this.status,
      };

      if (this.id) {
        const index = machines.findIndex(m => m.id === this.id);
        if (index !== -1) {
          machines[index] = newMachine;
        }
      } else {
        machines.push(newMachine);
      }

      localStorage.setItem("machinesData", JSON.stringify(machines));
      this.$router.push({ name: 'MachineManagement' });
    }
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
