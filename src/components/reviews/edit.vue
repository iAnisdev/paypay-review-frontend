<template>
  <section class="pa-2 mt-5">
    <v-rating
      v-model="review.rating"
      background-color="orange lighten-3"
      color="orange"
      large
    ></v-rating>
    <v-textarea
      label="Performance feedback"
      class="mt-3"
      v-model="review.feedback"
      placeholder="Please enter performance feedback"
      outlined
    ></v-textarea>
    <v-btn color="success" class="mt-4 submit-btn" @click="update">
      Update Feedback
    </v-btn>
  </section>
</template>


<script>
import { mapActions } from "vuex";
import eventBus from "@/plugins/eventBus";
export default {
  data() {
    return {
      review: {
        rating: 3,
        feedback: "",
      },
      request: {},
    };
  },
  methods: {
    ...mapActions({
      fetchPerfromanceReview: "fetchPerfromanceReview",
      updatePerformanceReviews: "updatePerformanceReviews",
    }),
    update() {
      let data = {
        id: this.$route.params.id,
        payload: this.review,
      };
      eventBus.emitTriggerLoader(true);
      this.updatePerformanceReviews(data).then(() => {
          eventBus.emitTriggerSnackBar({
            type: "success",
            text: "Feedback updated successfully",
          });
          this.$router.go(-1);
        }).catch(({ response }) => {
          if (response.data.errors) {
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
    },
    verifyReview() {
      this.fetchPerfromanceReview(this.$route.params.id).then((resp) => {
          console.log(resp);
          let { rating, feedback } = resp;
          this.review = { rating, feedback };
        }).catch(({ response }) => {
          eventBus.emitTriggerSnackBar({
            type: "error",
            text: response.data.message,
          });
          this.$router.go(-1);
        });
    },
  },
  mounted() {
    this.verifyReview();
  },
};
</script>

<style scoped>
.submit-btn {
  float: right;
}
</style>
