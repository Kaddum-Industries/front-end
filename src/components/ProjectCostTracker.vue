<template>
    <div class="input-row">
      <input type="date" class="input-style" placeholder="Enter date for Week 1">
      <div class="spacer"></div>
      <input type="text" class="input-style" placeholder="Claim">
      <div class="spacer"></div>
      <input type="text" class="input-style" placeholder="Total Contract Value">
    </div>
  </template>
  
  <script>
  export default {
    name: "First_"
  }
  </script>
  
  <style scoped>
  .input-row {
    display: grid;
    grid-template-columns: 1fr 4em 1fr 4em 1fr; /* Columns for inputs and spacers */
    align-items: center;
    gap: 10px; /* Space between grid items */
    margin-top: 5em; /* Top margin */
  }
  
  .input-style {
    padding: 10px 20px;
    font-size: 1rem;
    border: 2px solid #ccc; /* Subtle border styling */
    border-radius: 8px; /* Rounded corners for a modern look */
    transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    width: 100%; /* Ensures the input takes full width of the grid column */
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
    background-color: #fff; /* White background */
  }
  
  .input-style:focus {
    border-color: #007BFF; /* Highlight color on focus */
    box-shadow: 0 0 8px rgba(49, 132, 253, 0.5); /* Glow effect on focus */
    outline: none; /* Removes the default outline */
  }
  
  .spacer {
    grid-column: span 1; /* Ensures spacers take up correct space */
  }
  </style>
  