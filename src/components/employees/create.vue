<template>
  <section class="pa-4">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="user.firstname"
        :rules="nameRules"
        label="First Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.lastname"
        :rules="nameRules"
        label="Last Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.email"
        name="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.password"
        :rules="actionType === 'create' ? passwordRules : []"
        name="password"
        label="Password"
        type="password"
        :required="actionType === 'create'"
      ></v-text-field>
      <v-btn
        color="success"
        class="mt-4 create-btn"
        @click="submitForm"
        v-if="actionType === 'create'"
      >
        Create Employee
      </v-btn>
      <v-btn
        color="success"
        class="mt-4 create-btn"
        @click="updateEmployee"
        v-else
      >
        Update Employee
      </v-btn>
    </v-form>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import eventBus from "@/plugins/eventBus";
export default {
  data() {
    return {
      valid: false,
      user: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      },
      actionType: "create",
      nameRules: [(v) => !!v || "Name is required"],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [(v) => !!v || "Password is required"],
    };
  },
  methods: {
    ...mapActions({
      createEmployeesAction: "createEmployeesAction",
      loadEmployeesAction: "loadEmployeesAction",
      updateEmployeesAction: "updateEmployeesAction"
    }),
    submitForm() {
      this.$refs.form.validate();
      setTimeout(() => {
        if (this.valid === true) {
          eventBus.emitTriggerLoader(true);
          let data = this.user;
          this.createEmployeesAction(data).then(() => {
            eventBus.emitTriggerSnackBar({
              type: "success",
              text: "New user Added",
            });
            this.$router.push("/employees");
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
          });
        }
      }, 100);
    },
    updateEmployee() {
      this.$refs.form.validate();
      setTimeout(() => {
        if (this.valid === true) {
          eventBus.emitTriggerLoader(true);
          let data = {
            id: this.user.id,
            payload: {
              firstname: this.user.firstname,
              lastname: this.user.lastname,
              email: this.user.email,
            },
          };
          if (this.isValid(this.user.password)) {
            data.payload.password = this.user.password;
          }
          this.updateEmployeesAction(data).then(() => {
            eventBus.emitTriggerSnackBar({
              type: "success",
              text: "New user Added",
            });
            this.$router.push("/employees");
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
          });
        }
      }, 100);
    },
  },
  mounted() {
    if (this.$route.query.action === "edit") {
      eventBus.emitTriggerLoader(true);
      this.actionType = "edit";
      this.loadEmployeesAction(this.$route.query.id).then((resp) => {
        this.user = resp;
      }).catch(({ response }) => {
        eventBus.emitTriggerSnackBar({
          type: "error",
          text: response.data.message,
        });
        this.$router.push("/employees");
      }).finally(() => {
        eventBus.emitTriggerLoader(false);
      });
    }
  },
};
</script>

<style scoped>
.create-btn {
  float: right;
}
</style>