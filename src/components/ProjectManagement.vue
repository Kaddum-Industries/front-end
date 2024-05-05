<template>
  <div class="project-management-wrapper">
    <!-- Sidebar -->
    <aside class="sidebar">
      <h1 class="sidebar-title">Project Management</h1>
      <ul class="sidebar-nav">
        <li><button @click="goBack" class="nav-btn">Home</button></li>
      </ul>
    </aside>

    <!-- Main Content -->
    <div class="main-content">
      <header class="top-header">
        <div class="header-buttons">
          <button class="add-project-btn" @click="addProject">Add Project</button>
        </div>
      </header>

      <!-- Project Table -->
      <div class="project-table">
        <table>
          <thead>
            <tr>
              <th style="width: 80px;">Project ID</th>
              <th style="width: 200px;">Name</th>
              <th style="width: 120px;">Start Date</th>
              <th style="width: 250px;">Location</th>
              <th style="width: 100px;">Status</th>
              <th style="width: 150px;">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="projects.length === 0">
              <td colspan="6" class="no-projects-message">No projects to show</td>
            </tr>
            <tr v-for="project in projects" :key="project.id">
              <td>{{ project.id }}</td>
              <td>{{ project.name }}</td>
              <td>{{ project.startDate }}</td>
              <td>{{ project.location }}</td>
              <td>
                <span v-if="project.status === 'Active'" class="status-active">🟢 Active</span>
                <span v-if="project.status === 'Closed'" class="status-inactive">🔴 Closed</span>
              </td>
              <td>
                <button @click="editProject(project)">Edit</button>
                <button @click="deleteProject(project.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'project-management',
  data() {
    return {
      projects: []
    };
  },
  methods: {
    fetchProjects() {
      const storedProjects = JSON.parse(localStorage.getItem('projectsData')) || [];
      this.projects = storedProjects;
    },
    addProject() {
      localStorage.removeItem('editProject');
      this.$router.push({ name: 'AddProject' });
    },
    editProject(project) {
      localStorage.setItem('editProject', JSON.stringify(project));
      this.$router.push({ name: 'AddProject' });
    },
    deleteProject(id) {
      this.projects = this.projects.filter(project => project.id !== id);
      localStorage.setItem('projectsData', JSON.stringify(this.projects));
      console.log('Deleted project with ID:', id);
    },
    goBack() {
      this.$router.push({ name: 'Dashboard' });
    }
  },
  mounted() {
    this.fetchProjects();
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
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #f8f9fa;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 10px;
}

.header-buttons {
  display: flex;
  gap: 10px;
}

.add-project-btn {
  background-color: #b91c1c;
  color: white;
  padding: 10px;
  border-radius: 8px;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-project-btn:hover {
  background-color: #a11616;
}

/* Project Table */
.project-table {
  margin-top: 20px;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  overflow: hidden;
  min-height: 200px; /* Minimum height for the table */
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

.no-projects-message {
  text-align: center;
  font-weight: bold;
  color: #b91c1c;
  padding: 20px;
}

.status-active {
  color: green;
  font-weight: bold;
}

.status-inactive {
  color: red;
  font-weight: bold;
}

button {
  padding: 10px;
  background-color: #444;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #555;
}
</style>
