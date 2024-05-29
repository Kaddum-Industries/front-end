<template>
  <div class="active-shift-wrapper">
    <!-- Sidebar -->
    <aside class="sidebar">
      <h1 class="sidebar-title">Daily Track Sheet</h1>
      <ul class="sidebar-nav">
        <li><button @click="goHome" class="nav-btn">Home</button></li>
        <li><button @click="goTo('ProjectManagement')" class="nav-btn">Project Management</button></li>
        <li><button @click="goTo('EmployeeManagement')" class="nav-btn">Employee Management</button></li>
        <li><button @click="goTo('MachineManagement')" class="nav-btn">Machine Management</button></li>
        <li><button @click="goTo('DailyDiary')" class="nav-btn">Daily Diary</button></li>
        <li><button @click="goTo('CostingBreakdown')" class="nav-btn">Costing Breakdown</button></li>
        <li><button @click="goTo('ExpenseClaimed')" class="nav-btn">Expense Claimed</button></li>
        <li><button @click="goTo('ProjectCostTracker')" class="nav-btn">Project Cost Tracker</button></li>
        <li><button @click="goTo('WeeklyReport')" class="nav-btn">Weekly Report</button></li>
      </ul>
    </aside>

    <!-- Main Content -->
    <div class="main-content">
      <header class="top-header">
        <h1 class="header-title">Track Board</h1>
      </header>

      <!-- Notification Cards -->
      <div class="notification-cards">
        <div class="notification-card total-card">
          <div class="notification-text">
            <p>Total Shifts: {{ totalShifts }}</p>
          </div>
        </div>
        <div class="notification-card active-card">
          <div class="notification-text">
            <p>Inactive Shifts: {{ activeShifts }}</p>
          </div>
        </div>
        <div class="notification-card inactive-card">
          <div class="notification-text">
            <p>Active Shifts: {{ inactiveShifts }}</p>
          </div>
        </div>
      </div>

      <!-- Shift Dashboard -->
      <div class="collapsible-section gradient-1">
        <h2>
          Shift Dashboard 📅
          <span @click.stop="toggleSection('shift')" class="collapse-icon">
            <span v-if="visibleSections.shift">▼</span>
            <span v-else>▲</span>
          </span>
        </h2>
        <div v-show="visibleSections.shift">
          <div class="shift-action">
            <button class="add-shift-btn" @click="navigateToAddShift">Add Shift</button>
          </div>

          <div class="shift-table">
            <table>
              <thead>
                <tr>
                  <th style="width: 80px;">Employee ID</th>
                  <th style="width: 180px;">Project Name</th>
                  <th style="width: 200px;">Name</th>
                  <th style="width: 150px;">Role</th>
                  <th style="width: 120px;">Start Time</th>
                  <th style="width: 120px;">End Time</th>
                  <th style="width: 100px;">Total Hours</th>
                  <th style="width: 150px;">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="shift in sortedShifts" :key="shift.id">
                  <td>{{ shift.employeeId }}</td>
                  <td>{{ shift.projectName }}</td>
                  <td>{{ shift.employee }}</td>
                  <td>{{ shift.role }}</td>
                  <td>{{ formatTime(shift.startTime) }}</td>
                  <td>{{ formatTime(shift.endTime) }}</td>
                  <td>{{ shift.endTime ? calculateRunTime(shift.startTime, shift.endTime) : 'IN PROGRESS ⏳' }}</td>
                  <td>
                    <button @click="confirmStopShift(shift.id)">Stop</button>
                    <button @click="confirmDeleteShift(shift.id)">Delete</button>
                  </td>
                </tr>
                <tr v-if="shifts.length === 0">
                  <td colspan="8" class="no-shift-message">No active shifts available</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Machine Dashboard -->
      <div class="collapsible-section gradient-2">
        <h2>
          Machine Dashboard 🛠️
          <span @click.stop="toggleSection('machine')" class="collapse-icon">
            <span v-if="visibleSections.machine">▼</span>
            <span v-else>▲</span>
          </span>
        </h2>
        <div v-show="visibleSections.machine">
          <div class="machine-action">
            <button class="start-machine-btn" @click="navigateToStartMachine">Start Machine</button>
          </div>

          <div class="machine-table">
            <table>
              <thead>
                <tr>
                  <th style="width: 80px;">Machine ID</th>
                  <th style="width: 180px;">Project Name</th>
                  <th style="width: 200px;">Name</th>
                  <th style="width: 300px;">Description</th>
                  <th style="width: 120px;">Start Time</th>
                  <th style="width: 120px;">End Time</th>
                  <th style="width: 100px;">Total Run Time</th>
                  <th style="width: 150px;">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(machine, index) in sortedMachines" :key="index">
                  <td>{{ machine.machineId }}</td>
                  <td>{{ machine.projectName }}</td>
                  <td>{{ machine.machineName }}</td>
                  <td>{{ machine.description }}</td>
                  <td>{{ formatTime(machine.startTime) }}</td>
                  <td>{{ formatTime(machine.endTime) }}</td>
                  <td>{{ machine.endTime ? calculateRunTime(machine.startTime, machine.endTime) : 'IN PROGRESS ⏳' }}</td>
                  <td>
                    <button @click="confirmStopMachine(machine.id)">Stop</button>
                    <button @click="confirmDeleteMachine(machine.id)">Delete</button>
                  </td>
                </tr>
                <tr v-if="machines.length === 0">
                  <td colspan="8" class="no-machine-message">No active machines available</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Stop Shift Modal -->
    <div v-if="showStopShiftModal" class="stop-modal">
      <div class="modal-content">
        <h2>End Shift</h2>
        <p>Enter the end time for this shift:</p>
        <input type="time" v-model="endShiftTime" step="1" required />
        <div class="modal-buttons">
          <button @click="stopShift" class="confirm-btn">Submit</button>
          <button @click="cancelStopShift" class="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Stop Machine Modal -->
    <div v-if="showStopMachineModal" class="stop-modal">
      <div class="modal-content">
        <h2>End Machine Operation</h2>
        <p>Enter the end time for this machine operation:</p>
        <input type="time" v-model="endMachineTime" step="1" required />
        <div class="modal-buttons">
          <button @click="stopMachine" class="confirm-btn">Submit</button>
          <button @click="cancelStopMachine" class="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Delete Shift Confirmation Modal -->
    <div v-if="showDeleteShiftModal" class="delete-modal">
      <div class="modal-content">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this shift?</p>
        <div class="modal-buttons">
          <button @click="deleteShift" class="confirm-btn">Delete</button>
          <button @click="cancelDeleteShift" class="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Delete Machine Confirmation Modal -->
    <div v-if="showDeleteMachineModal" class="delete-modal">
      <div class="modal-content">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this machine?</p>
        <div class="modal-buttons">
          <button @click="deleteMachine" class="confirm-btn">Delete</button>
          <button @click="cancelDeleteMachine" class="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActiveShift',
  data() {
    return {
      currentTime: new Date().toLocaleString('en-US', { timeZone: 'Australia/Darwin' }),
      visibleSections: {
        shift: true,
        machine: true
      },
      shifts: [],
      machines: [],
      totalShifts: 0,
      activeShifts: 0,
      inactiveShifts: 0,
      showDeleteShiftModal: false,
      shiftIdToDelete: null,
      showStopShiftModal: false,
      shiftIdToStop: null,
      endShiftTime: null,
      showDeleteMachineModal: false,
      machineIdToDelete: null,
      showStopMachineModal: false,
      machineIdToStop: null,
      endMachineTime: null,
      employees: [],
      machinesData: []
    };
  },
  computed: {
    sortedShifts() {
      return [...this.shifts]
        .sort((a, b) => {
          if (!a.endTime && b.endTime) return -1;
          if (a.endTime && !b.endTime) return 1;
          return new Date(`1970-01-01T${a.startTime}Z`) - new Date(`1970-01-01T${b.startTime}Z`);
        });
    },
    sortedMachines() {
      return [...this.machines]
        .sort((a, b) => {
          if (!a.endTime && b.endTime) return -1;
          if (a.endTime && !b.endTime) return 1;
          return new Date(`1970-01-01T${a.startTime}Z`) - new Date(`1970-01-01T${b.startTime}Z`);
        });
    }
  },
  methods: {
    goHome() {
      this.$router.push({ name: 'Dashboard' });
    },
    goTo(routeName) {
      this.$router.push({ name: routeName });
    },
    navigateToAddShift() {
      this.$router.push({ name: 'AddShift' });
    },
    navigateToStartMachine() {
      this.$router.push({ name: 'StartMachine' });
    },
    toggleSection(section) {
      this.visibleSections[section] = !this.visibleSections[section];
    },
    loadEmployees() {
      const storedEmployees = JSON.parse(localStorage.getItem('employeesData')) || [];
      this.employees = storedEmployees;
    },
    loadMachines() {
      const storedMachines = JSON.parse(localStorage.getItem('machinesData')) || [];
      this.machines = storedMachines;
    },
    loadShifts() {
      const storedShifts = JSON.parse(localStorage.getItem('shiftsData')) || [];
      const storedEmployees = JSON.parse(localStorage.getItem('employeesData')) || [];
      this.shifts = storedShifts.map(shift => {
        const employee = storedEmployees.find(emp => emp.name === shift.employee);
        return {
          ...shift,
          employeeName: employee ? employee.name : 'Unknown',
          employeeId: employee ? employee.id : 'No ID'
        };
      });
    },
    loadMachineOperations() {
      const storedMachineOperations = JSON.parse(localStorage.getItem('machineOperationsData')) || [];
      const storedMachines = JSON.parse(localStorage.getItem('machinesData')) || [];
      this.machines = storedMachineOperations.map(operation => {
        const foundMachine = storedMachines.find(m => m.name === operation.machineName);
        return {
          ...operation,
          machineName: foundMachine ? foundMachine.name : 'Unknown',
          machineId: foundMachine ? foundMachine.id : 'No ID'
        };
      });
    },
    formatTime(time) {
      if (!time) return '';
      const [hours, minutes] = time.split(':');
      const date = new Date();
      date.setHours(hours);
      date.setMinutes(minutes);
      return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    },
    calculateRunTime(startTime, endTime) {
      if (!endTime) return 'IN PROGRESS ⏳';
      const start = new Date(`1970-01-01T${startTime}Z`);
      const end = new Date(`1970-01-01T${endTime}Z`);
      let duration = (end - start) / 1000; // duration in seconds

      if (duration < 0) {
        duration += 24 * 3600; // add 24 hours in seconds if duration is negative
      }

      const hours = Math.floor(duration / 3600);
      const minutes = Math.floor((duration % 3600) / 60);

      return `${hours} hours ${minutes} minutes`;
    },
    confirmStopShift(id) {
      this.shiftIdToStop = id;
      this.endShiftTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      this.showStopShiftModal = true;
    },
    stopShift() {
      if (this.shiftIdToStop !== null) {
        const shiftIndex = this.shifts.findIndex(shift => shift.id === this.shiftIdToStop);
        if (shiftIndex !== -1) {
          this.shifts[shiftIndex].endTime = this.endShiftTime;
          localStorage.setItem('shiftsData', JSON.stringify(this.shifts));
        }
        this.shiftIdToStop = null;
        this.showStopShiftModal = false;
      }
    },
    cancelStopShift() {
      this.shiftIdToStop = null;
      this.showStopShiftModal = false;
    },
    confirmStopMachine(id) {
      this.machineIdToStop = id;
      this.endMachineTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      this.showStopMachineModal = true;
    },
    stopMachine() {
      if (this.machineIdToStop !== null) {
        const machineIndex = this.machines.findIndex(machine => machine.id === this.machineIdToStop);
        if (machineIndex !== -1) {
          this.machines[machineIndex].endTime = this.endMachineTime;
          localStorage.setItem('machineOperationsData', JSON.stringify(this.machines));
        }
        this.machineIdToStop = null;
        this.showStopMachineModal = false;
      }
    },
    cancelStopMachine() {
      this.machineIdToStop = null;
      this.showStopMachineModal = false;
    },
    confirmDeleteShift(id) {
      this.shiftIdToDelete = id;
      this.showDeleteShiftModal = true;
    },
    deleteShift() {
      if (this.shiftIdToDelete !== null) {
        this.shifts = this.shifts.filter(shift => shift.id !== this.shiftIdToDelete);
        localStorage.setItem('shiftsData', JSON.stringify(this.shifts));
        this.shiftIdToDelete = null;
        this.showDeleteShiftModal = false;
      }
    },
    cancelDeleteShift() {
      this.shiftIdToDelete = null;
      this.showDeleteShiftModal = false;
    },
    confirmDeleteMachine(id) {
      this.machineIdToDelete = id;
      this.showDeleteMachineModal = true;
    },
    deleteMachine() {
      if (this.machineIdToDelete !== null) {
        this.machines = this.machines.filter(machine => machine.id !== this.machineIdToDelete);
        localStorage.setItem('machineOperationsData', JSON.stringify(this.machines));
        this.machineIdToDelete = null;
        this.showDeleteMachineModal = false;
      }
    },
    cancelDeleteMachine() {
      this.machineIdToDelete = null;
      this.showDeleteMachineModal = false;
    }
  },
  mounted() {
    this.loadEmployees();
    this.loadMachines();
    this.loadShifts();
    this.loadMachineOperations();
    this.totalShifts = this.shifts.length;
    this.activeShifts = this.shifts.filter(s => s.active).length;
    this.inactiveShifts = this.shifts.length - this.activeShifts;
    setInterval(() => {
      this.currentTime = new Date().toLocaleString('en-US', { timeZone: 'Australia/Darwin' });
    }, 60000);
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
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

.notification-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

.notification-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* Stronger shadow for glossy effect */
  border-radius: 12px;
  padding: 15px;
  flex-basis: 200px;
  display: flex;
  align-items: center;
}

.total-card {
  background-image: linear-gradient(to bottom, #ff9999, #ffcccc); /* Light Red Gradient */
}

.active-card {
  background-image: linear-gradient(to bottom, #66b3ff, #99ccff); /* Light Blue Gradient */
}

.inactive-card {
  background-image: linear-gradient(to bottom, #ffcc66, #ffdd99); /* Light Orange Gradient */
}

.notification-text {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.collapsible-section {
  margin-top: 20px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
}

.gradient-1 {
  background: linear-gradient(90deg, #da7171, #a3b8f4); /* Light Pink Gradient */
}

.gradient-2 {
  background: linear-gradient(90deg, #da7171, #a3d7a4); /* Light Red Gradient */
}

.collapsible-section h2 {
  cursor: default;
  background: linear-gradient(90deg, #b20a0a, #f82929); /* Red to Lighter Red Gradient */
  color: white;
  padding: 10px;
  text-align: start;
  font-size: 15px;
  border-radius: 10px 10px 0 0;
  margin: 0;
}

.collapse-icon {
  cursor: pointer;
  float: right;
}

.shift-action, .machine-action {
  text-align: right;
  padding: 10px 20px;
}

.add-shift-btn, .start-machine-btn {
  padding: 10px;
  background: linear-gradient(90deg, #a41313, #e56b6b);
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-shift-btn:hover, .start-machine-btn:hover {
  background-color: #5db072;
}

.shift-table, .machine-table {
  padding: 20px;
  font-weight: bold;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border: 1px solid #ccc;
}

th {
  background: linear-gradient(90deg, #b20a0a, #f82929); /* Red to Lighter Red Gradient */
  color: white;
}

td {
  background-color: #f9f9f9;
}

.no-shift-message, .no-machine-message {
  text-align: center;
  font-weight: bold;
  color: #b91c1c;
  padding: 20px;
}

button {
  padding: 10px;
  background-color: #444;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #555;
}

/* Modals */
.stop-modal, .delete-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  width: 300px;
  text-align: center;
}

.modal-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.confirm-btn, .cancel-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.confirm-btn {
  background-color: #4CAF50;
  color: white;
  transition: background-color 0.3s;
}

.confirm-btn:hover {
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
