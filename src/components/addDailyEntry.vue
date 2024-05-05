<template>
    <div class="costing-entry-wrapper">
      <header class="top-header">
        <h1 class="header-title">Add Daily Costing Entries</h1>
        <button class="back-button" @click="goBack">Back to Entries List</button>
      </header>
  
      <div class="form-container">
        <form @submit.prevent="submitCostingEntries">
          <div class="form-group">
            <label for="entry-date">Date:</label>
            <input type="date" id="entry-date" v-model="entryDate" required />
          </div>
  
          <div v-for="(entry, index) in entries" :key="index" class="entry-block">
            <div class="form-group">
              <label>Role:</label>
              <input type="text" v-model="entry.role" required placeholder="Enter role" />
            </div>
  
            <div class="form-group">
              <label>Hours:</label>
              <input type="number" v-model="entry.hours" required placeholder="Enter hours worked" />
            </div>
  
            <div class="form-group">
              <label>Day Rate:</label>
              <input type="number" v-model="entry.dayRate" required placeholder="Enter day rate" />
            </div>
  
            <div class="form-group">
              <label>Type of Employee:</label>
              <select v-model="entry.employeeType" required>
                <option value="indigenous">Indigenous</option>
                <option value="local">Local</option>
              </select>
            </div>
  
            <div class="form-group">
              <label>Description:</label>
              <textarea v-model="entry.description" placeholder="Enter description"></textarea>
            </div>
  
            <button type="button" @click="removeEntry(index)" class="remove-button">Remove Entry</button>
          </div>
          
          <button type="button" @click="addEntry" class="add-button">Add Another Entry</button>
          
          <div class="form-buttons">
            <button type="submit">Submit All Entries</button>
            <button type="button" @click="goBack">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'AddDailyCostingEntries',
    setup() {
      const router = useRouter();
      const entryDate = ref('');
      const entries = ref([{
        role: '',
        hours: 0,
        dayRate: 0,
        employeeType: '',
        description: ''
      }]);
  
      const goBack = () => {
        router.push({ name: 'EntriesList' });
      };
  
      const addEntry = () => {
        entries.value.push({
          role: '',
          hours: 0,
          dayRate: 0,
          employeeType: '',
          description: ''
        });
      };
  
      const removeEntry = (index) => {
        entries.value.splice(index, 1);
      };
  
      const submitCostingEntries = () => {
        console.log('Costing Entries Added:', entryDate.value, entries.value);
        // Implement storage or server integration
      };
  
      return {
        entryDate,
        entries,
        goBack,
        addEntry,
        removeEntry,
        submitCostingEntries
      };
    },
  };
  </script>
  
  <style scoped>
  .costing-entry-wrapper {
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
    padding: 25px;
  }
  
  .entry-block {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 20px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }
  
  label {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input[type="number"], input[type="text"], select, textarea {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
  }
  
  input[type="date"] {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
  }
  
  .remove-button, .add-button {
    padding: 10px;
    background-color: #444;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    align-self: center;
  }
  
  .remove-button:hover, .add-button:hover {
    background-color: #555;
  }
  
  .form-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  
  button {
    padding: 10px;
    background-color: #444;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #555;
  }
  </style>
  