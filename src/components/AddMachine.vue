<template>
    <div class="add-machine-wrapper">
      <header class="top-header">
        <h1 class="header-title">Add Machine</h1>
        <button class="back-button" @click="goBack">Back to Machine Management</button>
      </header>
  
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
            <button type="submit">Submit</button>
            <button type="button" @click="goBack">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'add-machine',
    data() {
      const editMachine = JSON.parse(localStorage.getItem('editMachine'));
      return {
        name: editMachine?.name || '',
        description: editMachine?.description || '',
        status: editMachine?.status || 'ACTIVE',
      };
    },
    methods: {
      goBack() {
        this.$router.push({ name: 'MachineManagement' });
      },
      submitForm() {
        const newMachine = {
          id: Date.now(),
          name: this.name,
          description: this.description,
          status: this.status,
        };
  
        // Save machine data to local storage
        localStorage.setItem('machineData', JSON.stringify(newMachine));
  
        this.$router.push({ name: 'MachineManagement' });
      },
    },
  };
  </script>
  
  <style scoped>
  .add-machine-wrapper {
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
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  button {
    padding: 10px;
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
  