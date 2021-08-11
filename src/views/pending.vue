<template>
  <v-app id="inspire">
    <navbar />
    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col>
            <v-sheet min-height="70vh" rounded="lg" class="pa-3">
              <router-view></router-view>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import navbar from "@/components/shared/navbar";
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
  components: {
    navbar,
  },
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
    submitReview() {},
  },
  mounted() {
    this.userDataAction().then((resp) => {
      this.loadToDo(resp);
    });
  },
};
</script>
