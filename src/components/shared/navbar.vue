<template>
  <v-app-bar app color="white" flat>
    <v-container class="py-0 fill-height">
      <v-avatar class="mr-10" color="grey darken-1" size="32"></v-avatar>
      <v-spacer></v-spacer>
      <v-btn class="ma-2" text icon color="red lighten-2" @click="logout">
        <v-icon> mdi-logout </v-icon>
      </v-btn>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("userLogoutAction");
    },
  },
};
</script>
