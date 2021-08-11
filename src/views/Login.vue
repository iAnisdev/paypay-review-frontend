<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="success">
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <form @submit="handleSubmit">
                <v-card-text>
                  <v-form>
                    <v-text-field
                      prepend-icon="mdi-email"
                      v-model="email"
                      placeholder="Email"
                      type="text"
                      autocomplete
                      required
                    ></v-text-field>
                    <v-text-field
                      prepend-icon="mdi-lock"
                      v-model="password"
                      placeholder="Password"
                      type="password"
                      required
                      autocomplete
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" type="submit">Login</v-btn>
                </v-card-actions>
              </form>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import eventBus from "@/plugins/eventBus";
import { mapActions } from "vuex";
export default {
  name: "Login",
  data: () => {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions({
      userLoginAction: "userLoginAction",
    }),
    handleSubmit(event) {
      event.preventDefault();
      if (this.isValid(this.email) && this.isValid(this.password)) {
        eventBus.emitTriggerLoader(true);
        this.userLoginAction({ email: this.email, password: this.password }).then(() => {
          this.$router.push('/')
        }).catch(({ response }) => {
          eventBus.emitTriggerSnackBar({
            type: "error",
            text: response.data.message,
          });
        }).finally(() => {
          eventBus.emitTriggerLoader(false);
        });
      } else {
        eventBus.emitTriggerSnackBar({
          type: "error",
          text: "Both email and password are required",
        });
      }
    },
  },
};
</script>