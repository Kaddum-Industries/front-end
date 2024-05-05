<template>
  <div class="dashboard-wrapper">
    <header class="top-header">
      <div class="logo-container">
        <img src="../assets/kaddum-logo.png" alt="Kaddum Industries Logo" class="header-logo" />
      </div>
      <h1 class="header-title">Kaddum Industries</h1>
    </header>

    <aside class="sidebar">
      <div class="sidebar-user">Clinton</div>
      <ul class="sidebar-menu">
        <li class="sidebar-item" @click="navigateTo('ProjectManagement')">
          <span class="menu-icon">&#128203;</span> Add Project
        </li>
        <li class="sidebar-item" @click="navigateTo('EmployeeManagement')">
          <span class="menu-icon">&#128221;</span> Employee Register
        </li>
        <li class="sidebar-item" @click="navigateTo('MachineManagement')">
          <span class="menu-icon">&#128736;</span> Machine Register
        </li>
        <li class="sidebar-item" @click="showLogoutModal = true">
          <span class="menu-icon">&#128275;</span> Logout
        </li>
      </ul>
    </aside>

    <section class="content-area">
      <div class="menu-items-container">
        <h2 class="menu-title">DASHBOARD</h2>
        <div class="menu-grid">
          <div class="menu-item" @click="navigateTo('DailyDiary')">
            <span class="menu-icon">&#128197;</span> Daily Diary
          </div>
          <div class="menu-item" @click="navigateTo('ActiveShift')">
            <span class="menu-icon">&#128337;</span> Daily Track Sheet
          </div>
          <div class="menu-item" @click="placeholderAction">
            <span class="menu-icon">&#128178;</span> Costing Breakdown
          </div>
          <div class="menu-item" @click="placeholderAction">
            <span the="menu-icon">&#128176;</span> Expense Claimed
          </div>
          <div class="menu-item" @click="placeholderAction">
            <span the="menu-icon">&#128200;</span> Project Cost Tracker
          </div>
          <div class="menu-item" @click="placeholderAction">
            <span the="menu-icon">&#128200;</span> Weekly Report
          </div>
        </div>
      </div>
      <div class="graph-container">
        <div id="graphContainer" ref="graphContainer" style="width:100%; height:310px;"></div>
        <marquee>{{ notification }}</marquee>
      </div>
    </section>

    <!-- Logout Confirmation Modal -->
    <div v-if="showLogoutModal" class="logout-modal">
      <div class="modal-content">
        <h2>Confirm Logout</h2>
        <p>Are you sure you want to log out?</p>
        <div class="modal-buttons">
          <button @click="confirmLogout" class="confirm-btn">Logout</button>
          <button @click="cancelLogout" class="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Highcharts from 'highcharts';
import Highcharts3d from 'highcharts/highcharts-3d';

Highcharts3d(Highcharts);

export default {
  name: 'ProjectDashboard',
  data() {
    return {
      graphData: {},
      notification: "Loading notifications...",
      graphInitialized: false,
      showLogoutModal: false // State to toggle the logout confirmation modal
    };
  },
  mounted() {
    this.fetchGraphData();
    this.fetchNotification();
    this.$nextTick(() => {
      this.initializeGraph();
    });
  },
  methods: {
    navigateTo(section) {
      this.$router.push({ name: section });
    },
    placeholderAction() {
    alert("This feature is coming soon!"); // Or any other message
    },
    confirmLogout() {
      this.$router.push({ name: 'Login' });
    },
    cancelLogout() {
      this.showLogoutModal = false; // Close the modal if "Cancel" is clicked
    },
    fetchGraphData() {
      setTimeout(() => {
        this.graphData = { manHours: 20, machineHours: 15 };
        this.updateGraph();
      }, 1000);
    },
    fetchNotification() {
      setTimeout(() => {
        this.notification = "Notice: Tomorrow is a scheduled maintenance day.";
      }, 1000);
    },
    initializeGraph() {
      if (this.$refs.graphContainer) {
        Highcharts.chart(this.$refs.graphContainer, {
          chart: {
            type: 'column',
            options3d: {
              enabled: true,
              alpha: 10,
              beta: 10,
              depth: 200,
              viewDistance: 25
            }
          },
          title: {
            text: 'HOURS TODAY',
            style: {
              color: 'rgba(170, 129, 129)',
              fontSize: '13px'
            }
          },
          plotOptions: {
            column: {
              depth: 200,
              colorByPoint: true,
              dataLabels: {
                enabled: true,
                inside: false,
                verticalAlign: 'top',
                y: -50,
                style: {
                  textOutline: 'none'
                }
              }
            }
          },
          xAxis: {
            categories: ['Man Hours', 'Machine Hours'],
            gridLineWidth: 0
          },
          yAxis: {
            title: { text: null },
            gridLineWidth: 0,
            labels: { enabled: false }
          },
          series: [{
            data: [this.graphData.manHours, this.graphData.machineHours],
            name: 'Hours'
          }]
        });
        this.graphInitialized = true;
      } else {
        console.error("Graph container not available.");
      }
    },
    updateGraph() {
      if (this.graphInitialized) {
        this.initializeGraph();
      } else {
        console.log("Graph not initialized yet, skipping update.");
      }
    }
  }
};
</script>

<style scoped>
.dashboard-wrapper {
  display: flex;
  height: 100vh;
}

.top-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 20px;
  background: linear-gradient(to right, #f30404, #e49191);
  color: white;
}

.logo-container {
  background-color: white;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.header-logo {
  height: 50px;
}

.header-title {
  flex-grow: 1;
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  text-shadow: 1px 1px 2px #000;
}

.sidebar {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #fff;
  width: 200px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar-user {
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
}

.sidebar-item {
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 13px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.menu-icon {
  margin-right: 10px;
}

.content-area {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.menu-items-container {
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 300px;
  margin: 20px 0;
  font-size: 10px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.6));
  border-radius: 10px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.menu-title {
  font-size: 15px;
  color: rgb(170, 129, 129);
  text-align: center;
  margin-bottom: 20px;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
}

.menu-item {
  background: linear-gradient(to right, #a20505, #ef6666);
  padding: 30px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: transform 0.3s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
}

.menu-item:hover {
  transform: scale(1.05);
}

.graph-container {
  width: 80%;
  height: auto;
  margin: 20px 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.6));
  border-radius: 10px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
}

#graphCanvas {
  max-width: 100%;
  height: auto;
}

marquee {
  width: 100%;
  color: #fff;
  background-color: rgba(150, 24, 24, 0.5);
}

.logout-modal {
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
  background-color: #f44336;
  color: white;
  transition: background-color 0.3s;
}

.confirm-btn:hover {
  background-color: #d32f2f;
}

.cancel-btn {
  background-color: #4CAF50;
  color: white;
  transition: background-color 0.3s;
}

.cancel-btn:hover {
  background-color: #45a049;
}
</style>
