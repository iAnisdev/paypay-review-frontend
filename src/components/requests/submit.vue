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
    <v-btn color="success" class="mt-4 submit-btn" @click="postReview">
      Post Review
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
      loadRequest: "loadRequest",
      addPerformanceReview: "addPerformanceReview",
      patchReviewRequest: "patchReviewRequest",
    }),
    postReview() {
      let data = {
        rating: this.review.rating,
        feedback: this.review.feedback,
        reviewer: this.request.reviewer,
        reviewFor: this.request.reviewFor,
      };
      eventBus.emitTriggerLoader(true);
      this.addPerformanceReview(data).then(() => {
       
        return this.patchReviewRequest(this.request.id)
      }).then(() => {
        eventBus.emitTriggerSnackBar({
          type: "success",
          text: "Feedback submitted successfully",
        });
        this.$router.push("/pending");
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
    verifyRequest() {
      this.loadRequest(this.$route.params.id).then((resp) => {
        if (resp.status === "pending") {
          this.request = resp;
        } else {
          eventBus.emitTriggerSnackBar({
            type: "error",
            text: "Review Already submitted",
          });
          this.$router.push("/pending");
        }
      }).catch(({ response }) => {
        eventBus.emitTriggerSnackBar({
          type: "error",
          text: response.data.message,
        });
        this.$router.push("/pending");
      });
    },
  },
  mounted() {
    this.verifyRequest();
  },
};
</script>

<style scoped>
.submit-btn {
  float: right;
}
</style>
