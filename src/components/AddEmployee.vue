<template>
    <div class="add-employee-wrapper">
      <header class="top-header">
        <h1 class="header-title">Add Employee</h1>
        <button class="back-button" @click="goBack">Back to Employee Management</button>
      </header>
  
      <div class="form-container">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Name:</label>
            <input
              type="text"
              v-model="name"
              placeholder="Enter name"
              required
            />
          </div>
  
          <div class="form-group">
            <label for="contact">Preferred Contact:</label>
            <input
              type="text"
              v-model="contact"
              placeholder="Enter preferred contact"
              required
            />
          </div>
  
          <div class="form-group">
            <label for="background">Background:</label>
            <select v-model="background" required>
              <option value="LOCAL">LOCAL</option>
              <option value="NOT LOCAL">NOT LOCAL</option>
              <option value="LOCAL & INDIGENOUS">LOCAL & INDIGENOUS</option>
              <option value="NOT LOCAL & INDIGENOUS">NOT LOCAL & INDIGENOUS</option>
            </select>
          </div>
  
          <div class="form-group">
            <label for="status">Status:</label>
            <select v-model="status" required>
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>
  
          <div class="form-buttons">
            <button type="submit">Submit</button>
            <button type="button" @click="goBack">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "add-employee",
    data() {
      const editEmployee = JSON.parse(localStorage.getItem("editEmployee"));  // Check if editing
      return {
        name: editEmployee?.name || '',  // Default to empty if no edit data
        contact: editEmployee?.contact || '',
        background: editEmployee?.background || 'LOCAL',
        status: editEmployee?.status || 'ACTIVE',
      };
    },
    methods: {
      goBack() {
        this.$router.push({ name: 'EmployeeManagement' });  // Navigate back to Employee Management
      },
      submitForm() {
        const newEmployee = {
          id: Date.now(),
          name: this.name,
          contact: this.contact,
          background: this.background,
          status: this.status,
        };
  
        // Save new employee data to local storage
        localStorage.setItem("employeeData", JSON.stringify(newEmployee));
  
        this.$router.push({ name: 'EmployeeManagement' });  // Redirect after submission
      },
    },
  };
  </script>
  
 
  <style scoped>
  .add-employee-wrapper {
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
    padding: 10px 20px;
    background-color: #444;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .back-button:hover {
    background-color: #555;
  }
  
  .form-container {
    margin-top: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    font-weight: bold;
  }
  
  input, select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .form-buttons {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  
  button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  