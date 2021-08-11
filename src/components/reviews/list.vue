<template>
  <section>
    <v-toolbar flat>
      <v-toolbar-title>List of Submitted reviews</v-toolbar-title>
    </v-toolbar>
    <div class="px-5 py-1" v-for="feedback in reviewsList" :key="feedback.id">
      <review :review="feedback" />
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import review from "./review.vue";
export default {
  components: {
    review,
  },
  data() {
    return {
      reviewsList: [],
    };
  },
  methods: {
    ...mapActions({
      listAllPerformaceReviews: "listAllPerformaceReviews",
    }),
    loadAllReviews() {
      this.listAllPerformaceReviews().then((resp) => {
        this.reviewsList = resp.list;
      });
    },
  },
  mounted() {
    this.loadAllReviews();
  },
};
</script>
