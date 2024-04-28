<template>
    <div class="employee-management-wrapper">
      <header class="top-header">
        <h1 class="header-title">Employee Management</h1>
        <div class="header-buttons">  <!-- Group the buttons to bring them closer -->
          <button class="back-button" @click="goBack">Home</button>
          <button class="add-employee-btn" @click="addEmployee">Add Employee</button>
        </div>
      </header>
  
      <div class="employee-table">
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Preferred Contact</th>
              <th>Background</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="employee in employees" :key="employee.id">
              <td>{{ employee.id }}</td>
              <td>{{ employee.name }}</td>
              <td>{{ employee.contact }}</td>
              <td>{{ employee.background }}</td>
              <td>{{ employee.status }}</td>
              <td>
                <button @click="editEmployee(employee)">Edit</button>
                <button @click="deleteEmployee(employee.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'employee-management',
    data() {
      return {
        employees: [], // Initialize an empty array for employees
      };
    },
    methods: {
      fetchEmployees() {
        const storedEmployee = JSON.parse(localStorage.getItem('employeeData')); // Fetch from local storage
        if (storedEmployee) {
          this.employees.push(storedEmployee);
        }
      },
      addEmployee() {
        localStorage.removeItem('editEmployee'); // Clear any edit-related data
        this.$router.push({ name: 'AddEmployee' }); // Navigate to AddEmployee
      },
      editEmployee(employee) {
        localStorage.setItem('editEmployee', JSON.stringify(employee)); // Store specific employee data
        this.$router.push({ name: 'AddEmployee' }); // Navigate to AddEmployee with data
      },
      deleteEmployee(id) {
        this.employees = this.employees.filter(employee => employee.id !== id); // Remove employee
        localStorage.removeItem('employeeData'); // Clear employee data from local storage
        console.log('Deleted employee with ID:', id); // Log the deletion
      },
      goBack() {
        this.$router.push({ name: 'Dashboard' }); // Navigate back to Dashboard
      },
    },
    mounted() {
      this.fetchEmployees(); // Fetch employees when the component mounts
    },
  };
  </script>
  
  <style scoped>
  .employee-management-wrapper {
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
  
  .back-button, .add-employee-btn {
    padding: 10px;
    background-color: #444;
    color: white;
    border-radius: 10px;
    cursor: pointer;
  }
  
  .back-button:hover, .add-employee-btn:hover {
    background-color: #555;  /* Hover effect */
  }
  
  .employee-table {
    padding: 20px;
  }
  
  table {
    width: 100%;  /* Take full width */
    border-collapse: collapse;
  }
  
  th, td {
    padding: 10px;  /* Ensure consistent spacing */
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
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #555;  /* Hover effect */
  }
  </style>
  