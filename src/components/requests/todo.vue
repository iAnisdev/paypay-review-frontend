<template>
  <v-data-table
    :headers="headers"
    :hide-default-footer="true"
    :items="toDoList"
    rounded="lg"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>List of performance reviews requiring feedback</v-toolbar-title>
      </v-toolbar>
    </template>
    <template v-slot:[`item.createdAt`]="{ item }">
      <p>{{ item.createdAt | timeFilter }}</p>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-btn depressed @click="submitReview(item)">Submit</v-btn>
    </template>
  </v-data-table>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    toDoList: [],
    headers: [
      {
        text: "Request Time",
        align: "start",
        sortable: false,
        value: "createdAt",
      },
      {
        text: "Review For",
        align: "start",
        sortable: false,
        value: "fullname",
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
      },
    ],
  }),
  methods: {
    ...mapActions({
      listRequireFeedbackRequest: "listRequireFeedbackRequest",
      userDataAction: "userDataAction",
    }),
    loadToDo(user) {
      this.listRequireFeedbackRequest(user.id).then((resp) => {
        this.toDoList = resp;
      });
    },
    submitReview(request) {
      console.log(request)
        this.$router.push(`/pending/${request.id}`)
    },
  },
  mounted() {
    this.userDataAction().then((resp) => {
      this.loadToDo(resp);
    });
  },
};
</script>
