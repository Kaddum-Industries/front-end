<template>
    <div class="daily-diary-wrapper">
      <header class="top-header">
        <h1 class="header-title">Daily Diary</h1>
        <button class="home-btn" @click="goBack">Home</button>  <!-- Home button -->
      </header>
  
      <!-- Step Navigation -->
      <div class="step-nav">
        <button
          :class="{ 'active-step': currentStep === 1 }"
          @click="setStep(1)"
        >Job Info</button>
        <button
          :class="{ 'active-step': currentStep === 2 }"
          @click="setStep(2)"
        >Activities & Safety</button>
        <button
          :class="{ 'active-step': currentStep === 3 }"
          @click="setStep(3)"
        >Delays</button>
        <button
          :class="{ 'active-step': currentStep === 4 }"
          @click="setStep(4)"
        >Safety Items</button>
        <button
          :class="{ 'active-step': currentStep === 5 }"
          @click="setStep(5)"
        >Additional Info</button>
      </div>
  
      <!-- Step Content -->
      <div v-if="currentStep === 1">
        <!-- Job Information -->
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
        <button @click="nextStep">Next</button>  <!-- Move to the next step -->
      </div>
  
      <div v-if="currentStep === 2">
        <!-- Activities and Safety -->
        <div class="form-group">
          <label for="activities">Activities Discussed:</label>
          <textarea id="activities" v-model="activities" rows="3" required></textarea>
        </div>
        <div class="form-group">
          <label for="safety-issues">Safety Issues Discussed:</label>
          <textarea id="safety-issues" v-model="safetyIssues" rows="2"></textarea>
        </div>
        <button @click="previousStep">Back</button>  <!-- Move to the previous step -->
        <button @click="nextStep">Next</button>  <!-- Move to the next step -->
      </div>
  
      <div v-if="currentStep === 3">
        <!-- Delays -->
        <div class="form-group">
          <label>Have Delays Occurred? (Please Tick)</label>
          <div class="checkbox-group">
            <label>
              <input type="checkbox" v-model="delays.access" /> Access
            </label>
            <label>
              <input type="checkbox" v-model="delays.awaitingInstructions" /> Awaiting Instructions from Client
            </label>
            <label>
              <input type="checkbox" v-model="delays.lackOfDrawings" /> Lack of Drawings
            </label>
            <label>
              <input type="checkbox" v-model="delays.subcontractors" /> Subcontractors
            </label>
            <label>
              <input type="checkbox" v-model="delays.awaitingDecision" /> Awaiting Decision from Client
            </label>
            <label>
              <input type="checkbox" v-model="delays.awaitingMaterials" /> Awaiting Materials
            </label>
            <label>
              <input type="checkbox" v-model="delays.poorWeather" /> Poor Weather
            </label>
            <label>
              <input type="checkbox" v-model="delays.rework" /> Re-Work
            </label>
            <label>
              <input type="checkbox" v-model="delays.industrialMatters" /> Industrial Matters
            </label>
            <label>
              <input type="checkbox" v-model="delays.other" /> Other
            </label>
          </div>
          <div class="form-group">
            <label for="details-of-delay">Details of Delay:</label>  <!-- New text field for details of delay -->
            <textarea v-model="detailsOfDelay" rows="3"></textarea>
          </div>
        </div>
        <button @click="previousStep">Back</button>  <!-- Move to the previous step -->
        <button @click="nextStep">Next</button>  <!-- Move to the next step -->
      </div>
  
      <div v-if="currentStep === 4">
        <!-- Safety Items Completed -->
        <div class="form-group">
          <label>Safety Items Completed (Enter Numbers):</label>
          <input
            type="number"
            placeholder="JHA"
            v-model="safetyItems.jha"
            min="0"
          />
          <input
            type="number"
            placeholder="CCC"
            v-model="safetyItems.ccc"
            min="0"
          />
          <input
            type="number"
            placeholder="Take 5"
            v-model="safetyItems.take5"
            min="0"
          />
          <input
            type="number"
            placeholder="Stop Seek"
            v-model="safetyItems.stopSeek"
            min="0"
          />
        </div>
        <button @click="previousStep">Back</button>  <!-- Move to the previous step -->
        <button @click="nextStep">Next</button>  <!-- Move to the next step -->
      </div>
  
      <div v-if="currentStep === 5">
        <!-- Additional Information -->
        <div class="form-group">
          <label>Instructions Received from Client:</label>
          <textarea v-model="instructionsReceived" rows="2"></textarea>
        </div>
        <div class="form-group">
          <label>Visitors On Site:</label>
          <textarea v-model="visitorsOnSite" rows="2"></textarea>
        </div>
        <div class="form-group">
          <label>Daily Progress and Description of Work Performed:</label>
          <textarea v-model="progressAndDescription" rows="3"></textarea>
        </div>
        <div class="form-group">
          <label>Handover Notes:</label>
          <textarea v-model="handoverNotes" rows="2"></textarea>
        </div>
        <button @click="previousStep">Back</button>  <!-- Move to the previous step -->
        <button @click="submitReport">Submit</button>  <!-- Submit report -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DailyDiary',
    data() {
      return {
        currentStep: 1,  // Starting step
        jobName: '',
        client: '',
        day: new Date().toISOString().split('T')[0],  // Default to current date
        supervisor: '',
        activities: '',
        safetyIssues: '',
        delays: {
          access: false,
          awaitingInstructions: false,
          lackOfDrawings: false,
          subcontractors: false,
          rework: false,
          industrialMatters: false,
          other: false,
        },
        detailsOfDelay: '',  // New field for details of delay
        safetyItems: {
          jha: '',
          ccc: '',
          take5: '',
          stopSeek: '',
        },
        instructionsReceived: '',
        visitorsOnSite: '',
        progressAndDescription: '',
        handoverNotes: '',
      };
    },
    methods: {
      goBack() {
        this.$router.push({ name: 'Dashboard' });  // Navigate back to the dashboard
      },
      setStep(step) {
        this.currentStep = step;  // Change the current step
      },
      nextStep() {
        if (this.currentStep < 5) {
          this.currentStep += 1;  // Move to the next step
        }
      },
      previousStep() {
        if (this.currentStep > 1) {
          this.currentStep -= 1;  // Move back to the previous step
        }
      },
      submitReport() {
        console.log('Report submitted');  // Logic for submitting the report
      },
    },
  };
  </script>
  
  <style scoped>
  .daily-diary-wrapper {
    padding: 20px;  /* Consistent padding */
  }
  
  .top-header {
    display: flex;  /* Proper layout */
    justify-content: space-between;
    align-items: center;
    background-color: #333;  /* Background color */
    color: white;  /* Text color */
    padding: 20px;  /* Padding */
  }
  
  .header-title {
    font-size: 24px;  /* Font size */
  }
  
  .header-buttons {  /* Grouped buttons */
    display: flex;
    gap: 10px;  /* Space between buttons */
  }
  
  .home-btn {
    padding: 10px;  /* Button padding */
    background-color: #444;  /* Default color */
    color: white;  /* Text color */
    border-radius: 10px;  /* Border radius */
    cursor: pointer;
  }
  
  .home-btn:hover {
    background-color: #555;  /* Hover effect */
  }
  
  .step-nav {
    display: flex;  /* Proper layout */
    justify-content: space-between;
    gap: 10px;  /* Space between step buttons */
  }
  
  button {
    padding: 10px;  /* Button padding */
    background-color: #444;  /* Default color */
    color: white;  /* Text color */
    border-radius: 10px;  /* Border radius */
    cursor: pointer;
  }
  
  button:hover, button.active-step {
    background-color: #ea7070;  /* Red-orange on hover and active step */
  }
  
  .form-group {
    margin-bottom: 20px;  /* Consistent spacing */
  }
  
  input, textarea {
    width: 100%;  /* Full width */
    padding: 10px;  /* Padding for input */
    border-radius: 5px;  /* Border radius */
    border: 1px solid #ccc;  /* Border style */
  }
  
  .checkbox-group {
    display: flex;  /* Layout for checkboxes */
    gap: 10px;  /* Space between checkboxes */
  }
  
  .form-buttons {
    display: flex;  /* Layout for form buttons */
    gap: 10px;  /* Space between buttons */
  }
  </style>
  