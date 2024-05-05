<!-- App.vue -->
<template>
  <div id="app">
    <!-- Apply a global fade transition around router-view -->
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
/* Global fade transition styles */
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s ease; /* Adjust transition time as needed */
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;  
}
</style>
