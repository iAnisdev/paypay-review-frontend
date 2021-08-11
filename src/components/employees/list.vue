<template>
  <section>
    <v-data-table :headers="headers" 
    :hide-default-footer="true" :items="employeesList" rounded="lg">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Employees List</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            dark
            class="mb-2"
            to="/employees/form">
            New Employee
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editEmployee(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteEmployee(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:[`item.reviewer`]="{ item }">
        <v-btn @click="assaignReviewer(item)" depressed>
          Assaign
          <v-icon right dark>mdi-plus </v-icon>
        </v-btn>
      </template>

      <template v-slot:no-data>
        <v-btn color="primary" @click="listAllEmployeesAction"> refresh </v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Are you sure to delete <b>&nbsp; {{ targetItem.firstname }} {{ targetItem.lastname }}</b>?</v-card-title>
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
        text: "First Name",
        align: "start",
        sortable: true,
        value: "firstname",
      },
      {
        text: "Last Name",
        align: "start",
        sortable: true,
        value: "lastname",
      },
      {
        text: "Email",
        align: "start",
        sortable: true,
        value: "email",
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
      },
      {
        text: "Assaign Reviewer",
        value: "reviewer",
        sortable: false,
      },
    ],
    targetItem: {},
  }),
  computed: {
    ...mapGetters({
      employeesList: "getEmployeesList",
    }),

    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    ...mapActions({
      listAllEmployeesAction: "listAllEmployeesAction",
      deleteEmployeesAction: "deleteEmployeesAction",
    }),
    deleteEmployee(obj) {
      this.targetItem = obj;
      this.dialogDelete = true;
    },
    closeDelete() {
      this.targetItem = {};
      this.dialogDelete = false;
    },
    deleteConfirm() {
      eventBus.emitTriggerLoader(true);
      this.deleteEmployeesAction({ id: this.targetItem.id }).then((resp) => {
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
          this.listAllEmployeesAction();
          this.closeDelete();
        });
    },
    editEmployee(employee){
      this.$router.push(`/employees/form?action=edit&id=${employee.id}`);
    },
    assaignReviewer(employee){
      this.$router.push(`/employees/${employee.id}`);
    },
  },

  mounted() {
    this.listAllEmployeesAction();
  },
};
</script>
