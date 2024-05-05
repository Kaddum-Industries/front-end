<template>
  <div class="daily-diary-wrapper">
    <!-- Sidebar -->
    <aside class="sidebar">
      <h1 class="sidebar-title">Daily Diary</h1>
      <ul class="sidebar-nav">
        <li><button @click="goBack" class="nav-btn">Home</button></li>
      </ul>
    </aside>

    <!-- Main Content -->
    <div class="main-content">
      <header class="top-header">
        <div class="report-generation">
          <input type="date" v-model="selectedDate" />
          <input type="text" v-model="fetchJobName" placeholder="Job Name" />
          <input type="text" v-model="fetchClient" placeholder="Client" />
          <button @click="generateReport">Generate Report</button>
        </div>
        <button class="create-diary-btn" @click="toggleForm">Create Diary</button>
      </header>

      <!-- Collapsible Form -->
      <div v-show="showForm" class="collapsible-form">
        <!-- Job Info Section -->
        <div class="collapsible-section">
          <h2 @click="toggleSection('jobInfo')">Job Info</h2>
          <div v-show="visibleSections.jobInfo">
            <div class="form-group">
              <label for="job-name">Job Name:</label>
              <input type="text" id="job-name" v-model="jobName" required />
            </div>
            <div class="form-group">
              <label for="client">Client:</label>
              <input type="text" id="client" v-model="client" required />
            </div>
            <div class="form-group">
              <label for="day">Day:</label>
              <input type="date" id="day" v-model="day" required />
            </div>
            <div class="form-group">
              <label for="supervisor">Supervisor:</label>
              <input type="text" id="supervisor" v-model="supervisor" required />
            </div>
          </div>
        </div>

        <!-- Activities & Safety Section -->
        <div class="collapsible-section">
          <h2 @click="toggleSection('activitiesSafety')">Activities & Safety</h2>
          <div v-show="visibleSections.activitiesSafety">
            <div class="form-group">
              <label for="activities">Activities Discussed:</label>
              <textarea id="activities" v-model="activities" rows="3" required></textarea>
            </div>
            <div class="form-group">
              <label for="safety-issues">Safety Issues Discussed:</label>
              <textarea id="safety-issues" v-model="safetyIssues" rows="2"></textarea>
            </div>
          </div>
        </div>

        <!-- Delays Section -->
        <div class="collapsible-section">
          <h2 @click="toggleSection('delays')">Delays</h2>
          <div v-show="visibleSections.delays">
            <div class="form-group">
              <label>Have Delays Occurred? (Please Tick)</label>
              <div class="checkbox-group">
                <label><input type="checkbox" v-model="delays.access" /> Access</label>
                <label><input type="checkbox" v-model="delays.awaitingInstructions" /> Awaiting Instructions</label>
                <label><input type="checkbox" v-model="delays.lackOfDrawings" /> Lack of Drawings</label>
                <label><input type="checkbox" v-model="delays.subcontractors" /> Subcontractors</label>
                <label><input type="checkbox" v-model="delays.awaitingDecision" /> Awaiting Decision</label>
                <label><input type="checkbox" v-model="delays.awaitingMaterials" /> Awaiting Materials</label>
                <label><input type="checkbox" v-model="delays.poorWeather" /> Poor Weather</label>
                <label><input type="checkbox" v-model="delays.rework" /> Rework</label>
                <label><input type="checkbox" v-model="delays.industrialMatters" /> Industrial Matters</label>
                <label><input type="checkbox" v-model="delays.other" /> Other</label>
              </div>
            </div>
            <div class="form-group">
              <label for="details-of-delay">Details of Delay:</label>
              <textarea id="details-of-delay" v-model="detailsOfDelay" rows="3"></textarea>
            </div>
          </div>
        </div>

        <!-- Safety Items Section -->
        <div class="collapsible-section">
          <h2 @click="toggleSection('safetyItems')">Safety Items</h2>
          <div v-show="visibleSections.safetyItems">
            <div class="form-group">
              <label for="safety-items-jha">JHA:</label>
              <input type="number" id="safety-items-jha" v-model="safetyItems.jha" min="0" />
            </div>
            <div class="form-group">
              <label for="safety-items-ccc">CCC:</label>
              <input type="number" id="safety-items-ccc" v-model="safetyItems.ccc" min="0" />
            </div>
            <div class="form-group">
              <label for="safety-items-take5">Take 5:</label>
              <input type="number" id="safety-items-take5" v-model="safetyItems.take5" min="0" />
            </div>
            <div class="form-group">
              <label for="safety-items-stop-seek">Stop Seek:</label>
              <input type="number" id="safety-items-stop-seek" v-model="safetyItems.stopSeek" min="0" />
            </div>
          </div>
        </div>

        <!-- Additional Info Section -->
        <div class="collapsible-section">
          <h2 @click="toggleSection('additionalInfo')">Additional Info</h2>
          <div v-show="visibleSections.additionalInfo">
            <div class="form-group">
              <label for="instructions-received">Instructions Received from Client:</label>
              <textarea id="instructions-received" v-model="instructionsReceived" rows="2"></textarea>
            </div>
            <div class="form-group">
              <label for="visitors-on-site">Visitors On Site:</label>
              <textarea id="visitors-on-site" v-model="visitorsOnSite" rows="2"></textarea>
            </div>
            <div class="form-group">
              <label for="progress-description">Daily Progress and Description of Work Performed:</label>
              <textarea id="progress-description" v-model="progressAndDescription" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label for="handover-notes">Handover Notes:</label>
              <textarea id="handover-notes" v-model="handoverNotes" rows="2"></textarea>
            </div>
          </div>
        </div>

        <div class="form-buttons">
          <button class="submit-btn" @click="submitForm">Submit</button>
          <button class="cancel-btn" @click="cancelForm">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DailyDiary',
  data() {
    return {
      selectedDate: new Date().toISOString().split('T')[0],
      fetchJobName: '',
      fetchClient: '',
      jobName: '',
      client: '',
      day: new Date().toISOString().split('T')[0],
      supervisor: '',
      activities: '',
      safetyIssues: '',
      delays: {
        access: false,
        awaitingInstructions: false,
        lackOfDrawings: false,
        subcontractors: false,
        awaitingDecision: false,
        awaitingMaterials: false,
        poorWeather: false,
        rework: false,
        industrialMatters: false,
        other: false
      },
      detailsOfDelay: '',
      safetyItems: {
        jha: 0,
        ccc: 0,
        take5: 0,
        stopSeek: 0
      },
      instructionsReceived: '',
      visitorsOnSite: '',
      progressAndDescription: '',
      handoverNotes: '',
      visibleSections: {
        jobInfo: true,
        activitiesSafety: false,
        delays: false,
        safetyItems: false,
        additionalInfo: false
      },
      showForm: false
    };
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'Dashboard' });
    },
    generateReport() {
      console.log(`Generating report for Job: ${this.fetchJobName}, Client: ${this.fetchClient}, Date: ${this.selectedDate}`);
      // Add your report generation logic here
    },
    toggleForm() {
      this.showForm = !this.showForm;
    },
    toggleSection(section) {
      this.visibleSections[section] = !this.visibleSections[section];
    },
    submitForm() {
      console.log('Submitting form data:', this.$data);
      // Add form submission logic here
    },
    cancelForm() {
      this.resetForm();
      this.showForm = false; // Hide the form
    },
    resetForm() {
      this.jobName = '';
      this.client = '';
      this.day = new Date().toISOString().split('T')[0];
      this.supervisor = '';
      this.activities = '';
      this.safetyIssues = '';
      this.delays = {
        access: false,
        awaitingInstructions: false,
        lackOfDrawings: false,
        subcontractors: false,
        awaitingDecision: false,
        awaitingMaterials: false,
        poorWeather: false,
        rework: false,
        industrialMatters: false,
        other: false
      };
      this.detailsOfDelay = '';
      this.safetyItems = {
        jha: 0,
        ccc: 0,
        take5: 0,
        stopSeek: 0
      };
      this.instructionsReceived = '';
      this.visitorsOnSite = '';
      this.progressAndDescription = '';
      this.handoverNotes = '';
      this.visibleSections = {
        jobInfo: true,
        activitiesSafety: false,
        delays: false,
        safetyItems: false,
        additionalInfo: false
      };
    }
  }
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
}

.top-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #f8f9fa;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 10px;
}

.report-generation {
  display: flex;
  gap: 10px;
}

.report-generation input, .report-generation button {
  padding: 10px;
  border-radius: 8px;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.report-generation button {
  background-color: #b91c1c;
  color: white;
  transition: background-color 0.3s;
}

.report-generation button:hover {
  background-color: #a11616;
}

.create-diary-btn {
  background-color: #b91c1c;
  color: white;
  padding: 10px;
  margin-left: 20px;
  border-radius: 8px;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: background-color 0.3s;
}

.create-diary-btn:hover {
  background-color: #a11616;
}

/* Collapsible Form Sections */
.collapsible-form {
  margin-top: 20px;
}

.collapsible-section {
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 13px;
  text-align: start;
  overflow: hidden;
}

.collapsible-section h2 {
  cursor: pointer;
  background: linear-gradient(90deg, #b20a0a, #f82929); /* Red to Lighter Red Gradient */
  color: white;
  padding: 10px;
  font-size: 15px;
  
  border-radius: 8px 8px 0 0;
  margin: 0;
}

.collapsible-section h2:hover {
  background: linear-gradient(90deg, #a41313, #ac2f2f); /* Darker Gradient on Hover */
}

.form-group {
  margin: 10px 0;
  padding: 0 20px;
}

label {
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 5px;
}

input[type="text"], input[type="number"], input[type="date"], textarea {
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.form-buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  margin-top: 20px;
  padding-left: 20px;
}

.submit-btn, .cancel-btn {
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.submit-btn {
  background-color: #b91c1c;
  color: white;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #a11616;
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
