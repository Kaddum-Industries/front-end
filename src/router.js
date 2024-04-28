import { createRouter, createWebHistory } from 'vue-router';
import LoginScreen from './components/Login.vue';
import ProjectDashboard from './components/Dashboard.vue';
import EmployeeManagement from './components/EmployeeManagement.vue';
import AddEmployee from './components/AddEmployee.vue';
import MachineManagement from './components/MachineManagement.vue';
import AddMachine from './components/AddMachine.vue';
import ActiveShift from './components/ActiveShift.vue';
import DailyDiary from './components/DailyDiary.vue';
import AddShift from './components/AddShift.vue';  // New import for Add Shift

const routes = [
  { path: '/', name: 'Login', component: LoginScreen },  // Default route
  { path: '/dashboard', name: 'Dashboard', component: ProjectDashboard },  // Project Dashboard
  { path: '/employee-management', name: 'EmployeeManagement', component: EmployeeManagement },  // Employee Management
  {
    path: '/add-employee',
    name: 'AddEmployee',
    component: AddEmployee,
    props: true,  // To accept route parameters if needed
  },
  {
    path: '/machine-management',
    name: 'MachineManagement',
    component: MachineManagement,  // Machine Management route
  },
  {
    path: '/add-machine',
    name: 'AddMachine',
    component: AddMachine,
    props: true,  // To accept route parameters if needed
  },
  {
    path: '/active-shift',  // Route for Active Shift
    name: 'ActiveShift',
    component: ActiveShift,
  },
  {
    path: '/daily-diary',  // Route for Daily Diary
    name: 'DailyDiary',
    component: DailyDiary,
  },
  {
    path: '/add-shift',  // New route for Add Shift
    name: 'AddShift',
    component: AddShift,
  },
];

const router = createRouter({
  history: createWebHistory(),  // Use browser history
  routes,  // Define routes
});

export default router;  // Export the router instance
