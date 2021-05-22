<template>
  <div>
    <loader v-if="loading" />
    <div v-else>
      <v-row class="gradient-back px-4 py-4" align="center">
        <v-col cols="4" class="py-0 d-flex align-center">
          <v-avatar color="secondary"
            ><span class="text--text font-weight-bold"
              >{{
                `${user.first_name[0].toUpperCase()}${user.last_name[0].toUpperCase()}`
              }}
            </span>
          </v-avatar>
          <span class="ml-2 white--text text-h5 font-weight-bold">{{
            getFullName
          }}</span>
        </v-col>
        <v-col cols="4" class="d-flex justify-center py-0">
          <img
            :src="require('../assets/images/logo.png')"
            alt="site visits logo"
            height="50"
          />
        </v-col>
        <v-col cols="4" class="py-0 d-flex justify-end">
          <v-btn
            color="secondary"
            class="text--text font-weight-bold"
            @click="logout"
            >Logout</v-btn
          >
        </v-col>
      </v-row>
      <v-row class="mx-0 pt-4 px-8" justify="space-between" align="center">
        <span class="text-h5 dark--text">Projects</span>
        <links-tab />
      </v-row>
      <v-row class="mx-0 pb-4 px-8" justify="center">
        <v-card class="project-card">
          <v-card-title class="mx-0" align="center">
            <v-text-field
              clearable
              hide-details
              v-model="searchVal"
              label="Search Project"
              append-icon="mdi-magnify"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="mt-2" @click="projectDialog = true"
              ><v-icon>mdi-plus</v-icon>Add Project</v-btn
            >
          </v-card-title>
          <v-divider></v-divider>
          <v-data-table
            :headers="headers"
            :items="projects"
            :search="searchVal"
          >
            <template v-slot:item.created="{ item }">
              {{ formatDate(item.created) }}
            </template>
            <template v-slot:item.key="{ item }">
              {{ item.key }}
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-on="on"
                    v-bind="attrs"
                    size="18"
                    color="#a0a0a0"
                    class="ml-2 mb-1"
                    @click="copyValue(item.key)"
                    >mdi-content-copy</v-icon
                  >
                </template>
                <span>Click to copy the key</span>
              </v-tooltip>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-on="on"
                    v-bind="attrs"
                    size="18"
                    class="mr-2"
                    @click="viewProject(item)"
                    >mdi-eye</v-icon
                  >
                </template>
                <span>View project details</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-on="on"
                    v-bind="attrs"
                    size="18"
                    class="mr-2"
                    @click="editProject(item)"
                    >mdi-pencil</v-icon
                  >
                </template>
                <span>Edit project</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-on="on"
                    v-bind="attrs"
                    size="18"
                    @click="handleProjectDelete(item.id)"
                    >mdi-delete</v-icon
                  >
                </template>
                <span>Delete project</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-card>
      </v-row>
    </div>
    <v-dialog v-model="projectDialog" width="500px">
      <add-edit-project
        :project="projectToEdit"
        @projectCreated="handleProjectCreated"
        @projectEdited="handleProjectEdited"
        @closeDialog="projectDialog = false"
      />
    </v-dialog>
    <v-dialog v-model="viewProjectDialog" width="480px">
      <view-project :project="projectToView" />
    </v-dialog>
    <v-dialog v-model="confirmDeleteDialog" width="400px">
      <v-card class="pa-8">
        <v-row class="mx-0 text-h5" justify="center">Confirm Delete</v-row>
        <v-row class="mx-0 py-6" justify="center"
          >Are you sure you want to delete the project ?</v-row
        >
        <v-row class="mx-0" justify="center">
          <v-btn
            color="primary"
            :loading="submitLoading"
            :disabled="submitLoading"
            @click="deleteProject"
            >Yes</v-btn
          >
          <v-btn color="error" class="ml-4" @click="confirmDeleteDialog = false"
            >No</v-btn
          >
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { me } from "../apis/auth";
import { getProjects, deleteProject } from "../apis/project";
import moment from "moment";
import eventBus from "../plugins/eventBus";
import Loader from "../components/Loader.vue";
import AddEditProject from "../components/AddEditProject.vue";
import ViewProject from "../components/ViewProject.vue";
import LinksTab from '../components/LinksTab.vue';

export default {
  name: "Projects",
  components: { Loader, AddEditProject, ViewProject, LinksTab },
  data() {
    return {
      loading: true,
      user: null,
      projects: [],
      projectDialog: false,
      searchVal: null,
      headers: [
        {
          text: "Title",
          align: "start",
          sortable: true,
          value: "title",
          filterable: true,
        },
        {
          text: "Created At",
          align: "center",
          sortable: true,
          value: "created",
          filterable: false,
        },
        {
          text: "Key",
          align: "center",
          sortable: false,
          value: "key",
          filterable: false,
        },
        {
          text: "Visits",
          align: "center",
          sortable: true,
          value: "visits",
          filterable: false,
        },
        {
          text: "",
          align: "center",
          sortable: false,
          value: "actions",
          filterable: false,
        },
      ],
      projectToEdit: {
        id: null,
        title: null,
        description: null,
        url: null,
      },
      projectToView: null,
      viewProjectDialog: false,
      idToDelete: null,
      confirmDeleteDialog: false,
      submitLoading: false,
    };
  },
  computed: {
    getFullName() {
      return (
        this.user.first_name[0].toUpperCase() +
        this.user.first_name.slice(1).toLowerCase() +
        " " +
        this.user.last_name[0].toUpperCase() +
        this.user.last_name.slice(1).toLowerCase()
      );
    },
  },
  mounted() {
    this.getMe();
  },
  methods: {
    logout() {
      localStorage.removeItem("SITEVISITS_TOKEN");
      this.$router.replace({ name: "Home" });
    },
    formatDate(date) {
      return moment(date).format("DD MMM yyyy, hh:mm A");
    },
    getMe() {
      me()
        .then((response) => {
          this.user = response;
          this.fetchProjects();
        })
        .catch((error) => {
          console.log(error);
          this.logout();
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        });
    },
    fetchProjects() {
      getProjects()
        .then((response) => {
          this.projects = response.results;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleProjectCreated(project) {
      this.projects.unshift(project);
    },
    handleProjectEdited(project) {
      const index = this.projects.findIndex((obj) => obj.id === project.id);
      this.projects.splice(index, 1, project);
      this.projectToEdit = {
        id: null,
        title: null,
        description: null,
        url: null,
      };
    },
    copyValue(key) {
      navigator.clipboard.writeText(key);
      const data = {
        color: "success",
        text: "Key opied to clipboard!",
      };
      eventBus.$emit("SNACKBAR", data);
    },
    viewProject(item) {
      this.projectToView = item;
      this.viewProjectDialog = true;
    },
    editProject(item) {
      this.projectToEdit = item;
      this.projectDialog = true;
    },
    handleProjectDelete(id) {
      this.idToDelete = id;
      this.confirmDeleteDialog = true;
    },
    deleteProject() {
      this.submitLoading = true;
      deleteProject(this.idToDelete)
        .then(() => {
          const index = this.projects.findIndex(
            (obj) => obj.id === this.idToDelete
          );
          this.projects.splice(index, 1);
          const data = {
            color: "success",
            text: "Project Deleted!",
          };
          eventBus.$emit("SNACKBAR", data);
        })
        .catch(() => {
          const data = {
            color: "error",
            text: "Some error occured! Please try again later.",
          };
          eventBus.$emit("SNACKBAR", data);
        })
        .finally(() => {
          this.submitLoading = false;
          this.confirmDeleteDialog = false;
        });
    },
  },
};
</script>

<style scoped>
.project-card {
  width: 100%;
}
.gradient-back {
  background-size: cover;
}
</style>