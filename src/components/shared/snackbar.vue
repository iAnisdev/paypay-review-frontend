<template>
  <section>
    <v-snackbar
      style="z-index: 21241"
      v-model="showSnackbar"
      :timeout="2500"
      :value="true"
      :color="type"
      absolute
      top
    >
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="showSnackbar = false"> X </v-btn>
      </template>
    </v-snackbar>
  </section>
</template>

<script>
import eventBus from "@/plugins/eventBus";
export default {
  name: "snackbar",
  data: () => ({
    text: "",
    type: "",
    showSnackbar: false,
  }),
  methods: {
    toggleSnackBar({ text, type }) {
      this.text = text;
      this.type = type;
      this.showSnackbar = true;
    },
  },
  created() {
    eventBus.$on("triggerSnackBar", this.toggleSnackBar);
  },
  beforeDestroy() {
    eventBus.$off("triggerSnackBar", this.toggleSnackBar);
  },
};
</script>
