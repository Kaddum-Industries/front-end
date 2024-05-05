import { createRouter, createWebHistory } from 'vue-router';
import LoginScreen from './components/Login.vue';
import ProjectDashboard from './components/Dashboard.vue';
import EmployeeManagement from './components/EmployeeManagement.vue';
import AddEmployee from './components/AddEmployee.vue';
import MachineManagement from './components/MachineManagement.vue';
import AddMachine from './components/AddMachine.vue';
import ActiveShift from './components/ActiveShift.vue';
import DailyDiary from './components/DailyDiary.vue';
import AddShift from './components/AddShift.vue';
import StartMachine from './components/StartMachine.vue'; // New import for Start Machine
import ProjectManagement from './components/ProjectManagement.vue'; 
import AddProject from './components/AddProject.vue';
import CostingBreakDown from './components/CostingBreakDown.vue';
import addDailyEntry from './components/addDailyEntry.vue';
import RegisterForm from './components/RegisterForm.vue';
import ProjectCostTracker from './components/ProjectCostTracker.vue';

const routes = [
  { path: '/', name: 'Login', component: LoginScreen },
  { path: '/dashboard', name: 'Dashboard', component: ProjectDashboard },
  { path: '/employee-management', name: 'EmployeeManagement', component: EmployeeManagement },
  {
    path: '/add-employee',
    name: 'AddEmployee',
    component: AddEmployee,
    props: true,
  },
  {
    path: '/machine-management',
    name: 'MachineManagement',
    component: MachineManagement,
  },
  {
    path: '/add-machine',
    name: 'AddMachine',
    component: AddMachine,
    props: true,
  },
  {
    path: '/active-shift',
    name: 'ActiveShift',
    component: ActiveShift,
  },
  {
    path: '/daily-diary',
    name: 'DailyDiary',
    component: DailyDiary,
  },
  {
    path: '/add-shift',
    name: 'AddShift',
    component: AddShift,
    props: true,
  },
  {
    path: '/start-machine', // New route for Start Machine
    name: 'StartMachine',
    component: StartMachine,
    props: true,
  },
  { 
    path: '/project-management',
    name: 'ProjectManagement',
    component: ProjectManagement,
  },
  { 
    path: '/add-project',
    name: 'AddProject',
    component: AddProject,
    props: true,
  },
  { 
    path: '/costing-breakdown',
    name: 'CostingBreakDown',
    component: CostingBreakDown,
    props: true,
  },
  { 
    path: '/add-dailyentry',
    name: 'addDailyEntry',
    component: addDailyEntry,
    props: true,
  },
  {
    path: '/register-form',
    name: 'RegisterForm',
    component: RegisterForm,
    props: true,
  },
  {
    path: '/project-costtracker',
    name: 'ProjectCostTracker',
    component: ProjectCostTracker,
    props: true,
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

