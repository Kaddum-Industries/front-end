<template>
    <div class="entries-list-wrapper">
      <header class="top-header">
        <h1 class="header-title">Costing Break Down</h1>
        <button class="add-entry-button" @click="addDailyEntry">Add Daily Entries</button>
      </header>
  
      <div class="date-picker">
        <label for="view-date">Select Date to View Entries:</label>
        <input type="date" id="view-date" v-model="selectedDate" @change="fetchEntriesForDate" />
      </div>
  
      <div class="entries-table" v-if="entries.length">
        <table>
          <thead>
            <tr>
              <th>Role</th>
              <th>Hours</th>
              <th>Day Rate</th>
              <th>Total</th>
              <th>Type of Employee</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(entry, index) in entries" :key="index">
              <td>{{ entry.role }}</td>
              <td>{{ entry.hours }}</td>
              <td>{{ entry.dayRate }}</td>
              <td>{{ entry.hours * entry.dayRate }}</td>
              <td>{{ entry.employeeType }}</td>
              <td>{{ entry.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="no-entries">
        <p>No entries found for this date.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'EntriesList',
    setup() {
      const selectedDate = ref('');
      const entries = ref([]);
  
      const fetchEntriesForDate = async () => {
        // Here you would fetch from your backend or local storage
        console.log('Fetching entries for:', selectedDate.value);
        // Simulated fetch result
        entries.value = [
          { role: 'Engineer', hours: 8, dayRate: 120, employeeType: 'Local', description: 'Design work' },
          { role: 'Laborer', hours: 9, dayRate: 85, employeeType: 'Indigenous', description: 'Construction work' }
        ];
      };
  
      const addDailyEntry = () => {
        this.$router.push({ name: 'StartMachine' })
        console.log('Adding daily entry');
      };
  
      return {
        selectedDate,
        entries,
        fetchEntriesForDate,
        addDailyEntry
      };
    },
  };
  </script>
  
  <style scoped>
  .entries-list-wrapper {
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
  
  .add-entry-button {
    padding: 10px 20px;
    font-size: 16px;
    color: white;
    background-color: #313431;
    border: none;
    cursor: pointer;
  }
  
  .date-picker {
    margin: 20px 0;
  }
  
  .entries-table table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .entries-table th, .entries-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  .entries-table th {
    background-color: #f2f2f2;
  }
  
  .no-entries {
    text-align: center;
    margin-top: 20px;
  }
  </style>