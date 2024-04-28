<template>
    <div class="active-shift-wrapper">
      <header class="top-header">
        <h1 class="header-title">Active Shifts</h1>
        <button class="home-btn" @click="goHome">Home</button>  <!-- Home button -->
      </header>
  
      <!-- Space between header and "Add Shift" button -->
      <div class="shift-action" style="margin-top: 20px;">
        <button class="add-shift-btn" @click="navigateToAddShift">Add Shift</button>  <!-- Add Shift button -->
      </div>
  
      <!-- Employee tracking table -->
      <div class="shift-table">
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Start Time</th>
              <th>Action</th>  <!-- Action column for buttons -->
            </tr>
          </thead>
          <tbody>
            <!-- Placeholder for user-entered data -->
          </tbody>
        </table>
      </div>
  
      <!-- Divider between employee and machine tables -->
      <hr class="divider" />
  
      <!-- "Start Machine" button placed on the right -->
      <div class="machine-action">
        <button class="start-machine-btn" @click="startMachine">Start Machine</button>  <!-- Start Machine button -->
      </div>
  
      <!-- Machine tracking table -->
      <div class="machine-table">
        <table>
          <thead>
            <tr>
              <th>Machine ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Start Time</th>  <!-- Start Time column -->
              <th>Action</th>  <!-- Action column for machine-related actions -->
            </tr>
          </thead>
          <tbody>
            <!-- Placeholder for user-entered data -->
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ActiveShift',  // Component name
    methods: {
      goHome() {
        this.$router.push({ name: 'Dashboard' });  // Navigate to the dashboard
      },
      navigateToAddShift() {
        this.$router.push({ name: 'AddShift' });  // Navigate to AddShift when "Add Shift" is clicked
      },
      startMachine() {
        console.log("Starting a new machine");
        // Functionality to start a new machine
      },
    },
  };
  </script>
  
  <style scoped>
  .active-shift-wrapper {
    padding: 20px;  /* Consistent padding */
  }
  
  .top-header {
    display: flex;  /* Proper layout */
    justify-content: space-between;
    align-items: center;
    background-color: #333;  /* Background color */
    color: white;  /* Text color */
    padding: 20px;  /* Header padding */
  }
  
  .header-title {
    font-size: 24px;  /* Font size */
  }
  
  .home-btn {
    padding: 10px;  /* Button padding */
    background-color: #444;  /* Default color */
    color: white;  /* Text color */
    border-radius: 10px;  /* Border radius */
    cursor: pointer;
  }
  
  .home-btn:hover {
    background-color: #555;  /* Hover effect */
  }
  
  .shift-action {
    text-align: right;  /* Align "Add Shift" to the right */
    margin-top: 20px;  /* Space between header and "Add Shift" button */
  }
  
  .add-shift-btn {
    padding: 10px;  /* Button padding */
    background-color: #308c2f;  /* Default color */
    color: white;  /* Text color */
    border-radius: 5px;  /* Border radius */
    cursor: pointer;
  }
  
  .add-shift-btn:hover {
    background-color: #5db072;  /* Hover effect */
  }
  
  .shift-table, .machine-table {
    padding: 20px;  /* Consistent padding */
  }
  
  table {
    width: 100%;  /* Full width */
    border-collapse: collapse;  /* Collapsible borders */
  }
  
  th, td {
    padding: 10px;  /* Consistent padding */
    border: 1px solid #ccc;  /* Table borders */
  }
  
  th {
    background-color: #333;  /* Header background */
    color: white;  /* Header text color */
  }
  
  .divider {
    border-top: 2px solid #ddd;  /* Divider styling */
    margin: 20px 0;  /* Spacing for divider */
  }
  
  .machine-action {
    text-align: right;  /* Align "Start Machine" to the right */
    padding-bottom: 10px;  /* Padding for the action section */
  }
  
  .start-machine-btn {
    padding: 10px;  /* Button padding */
    background-color: #308c2f;  /* Default color for "Start Machine" */
    color: white;  /* Text color */
    border-radius: 5px;  /* Rounded corners */
    cursor: pointer;
  }
  
  .start-machine-btn:hover {
    background-color: #5db072;  /* Hover effect */
  }
  </style>
  