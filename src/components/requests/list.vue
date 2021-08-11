<template>
  <section>
    <v-data-table
      :headers="headers"
      :hide-default-footer="true"
      :items="pendingRequests"
      rounded="lg"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Pending Reviews</v-toolbar-title>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small @click="deleteRequest(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="dialogDelete" max-width="550px">
      <v-card>
        <v-card-title class="text-h5">Are you sure to delete this request?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="deleteConfirm">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import eventBus from "@/plugins/eventBus";
export default {
  data: () => ({
    dialogDelete: false,
    headers: [
      {
        text: "Reviewer",
        align: "start",
        sortable: false,
        value: "reviewerUser.fullname",
      },
      {
        text: "Review For",
        align: "start",
        sortable: false,
        value: "reviewForUser.fullname",
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
      },
    ],
    targetRequest: {},
  }),
  computed: {
    ...mapGetters({
      pendingRequests: "getPendingRequests",
    }),
  },
  methods: {
    ...mapActions({
      listPendingRequests: "listPendingRequests",
      deleteReviewRequest: "deleteReviewRequest",
    }),
    deleteRequest(obj) {
      this.targetRequest = obj;
      this.dialogDelete = true;
    },
    closeDelete() {
      this.targetRequest = {};
      this.dialogDelete = false;
    },
    deleteConfirm() {
      eventBus.emitTriggerLoader(true);
      this.deleteReviewRequest(this.targetRequest.id).then((resp) => {
          eventBus.emitTriggerSnackBar({
            type: "success",
            text: resp.message,
          });
        }).catch(({ response }) => {
          if (response.data.errors) {
            console.log(response.data.errors);
            response.data.errors.errors.forEach((err) => {
              eventBus.emitTriggerSnackBar({
                type: "error",
                text: err.msg,
              });
            });
          } else {
            eventBus.emitTriggerSnackBar({
              type: "error",
              text: response.data.message,
            });
          }
        }).finally(() => {
          eventBus.emitTriggerLoader(false);
          this.listPendingRequests();
          this.closeDelete();
        });
    },
  },

  mounted() {
    this.listPendingRequests();
  },
};
</script>
