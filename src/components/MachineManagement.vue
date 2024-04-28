<template>
    <div class="machine-management-wrapper">
      <header class="top-header">
        <h1 class="header-title">Machine Management</h1>
        <div class="header-buttons">  <!-- Group the buttons to bring them closer -->
          <button class="back-button" @click="goBack">Home</button>  <!-- Home button -->
          <button class="add-machine-btn" @click="addMachine">Add Machine</button>  <!-- Add Machine button -->
        </div>
      </header>
  
      <div class="machine-table">
        <table>
          <thead>
            <tr>
              <th>Machine ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>  <!-- Action column for edit and delete buttons -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="machine in machines" :key="machine.id">
              <td>{{ machine.id }}</td>
              <td>{{ machine.name }}</td>
              <td>{{ machine.description }}</td>
              <td>{{ machine.status }}</td>  <!-- Displaying Status -->
              <td>
                <button @click="editMachine(machine)">Edit</button>  <!-- Edit button -->
                <button @click="deleteMachine(machine.id)">Delete</button>  <!-- Delete button -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'machine-management',
    data() {
      return {
        machines: [],  // Initialize empty array for machines
      };
    },
    methods: {
      fetchMachines() {
        const storedMachine = JSON.parse(localStorage.getItem('machineData'));  // Fetch from local storage
        if (storedMachine) {
          this.machines.push(storedMachine);
        }
      },
      addMachine() {
        localStorage.removeItem('editMachine');  // Clear any edit-related data
        this.$router.push({ name: 'AddMachine' });  // Navigate to AddMachine
      },
      editMachine(machine) {
        localStorage.setItem('editMachine', JSON.stringify(machine));  // Store specific machine data
        this.$router.push({ name: 'AddMachine' });  // Navigate to AddMachine with data
      },
      deleteMachine(id) {
        this.machines = this.machines.filter(machine => machine.id !== id);  // Remove machine by ID
        localStorage.removeItem('machineData');  // Clear machine data from local storage
      },
      goBack() {
        this.$router.push({ name: 'Dashboard' });  // Navigate back to Dashboard
      },
    },
    mounted() {
      this.fetchMachines();  // Fetch machines when the component mounts
    },
  };
  </script>
  
  <style scoped>
  .machine-management-wrapper {
    padding: 20px;
  }
  
  .top-header {
    display: flex;
    justify-content: space-between;  /* Align buttons to the sides */
    align-items: center;
    background-color: #333;
    color: white;
    padding: 20px;
  }
  
  .header-title {
    font-size: 24px;
    color: white;
  }
  
  .header-buttons {  /* Grouped buttons to bring them closer */
    display: flex;
    gap: 10px;  /* Space between buttons */
  }
  
  .back-button, .add-machine-btn {
    padding: 10px;
    background-color: #444;
    color: white;
    border-radius: 10px;
    cursor: pointer;
  }
  
  .back-button:hover, .add-machine-btn:hover {
    background-color: #555;  /* Hover effect */
  }
  
  .machine-table {
    padding: 20px;
  }
  
  table {
    width: 100%;  /* Full width */
    border-collapse: collapse;  /* Ensure seamless table */
  }
  
  th, td {
    padding: 10px;  /* Consistent padding */
    border: 1px solid #ccc;  /* Table borders */
  }
  
  th {
    background-color: #333;  /* Table header background */
    color: white;  /* Table header text color */
  }
  
  button {
    padding: 10px;
    background-color: #444;
    color: white;
    border-radius: 10px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #555;  /* Hover effect */
  }
  </style>
  