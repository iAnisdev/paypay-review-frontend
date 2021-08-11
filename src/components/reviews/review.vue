<template>
  <section>
    <v-card outlined v-if="review">
      <v-app-bar flat>
        <v-col>
          <v-toolbar-title v-if="showBy">Given By: {{ review.reviewerUser.firstname }}  {{ review.reviewerUser.lastname }}</v-toolbar-title>
          <v-toolbar-title v-if="showFor">Review For: {{ review.reviewForUser.firstname}}{{ review.reviewForUser.lastname }}</v-toolbar-title>
        </v-col>
        <v-spacer></v-spacer>
        <v-btn icon :to="`/review/${review.id}`">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-app-bar>
      <v-card-text class="mt-1">
        <v-row align="center" class="mx-0">
          <v-rating
            :value="review.rating"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>
          <div class="grey--text ms-4">{{ review.rating }}</div>
        </v-row>
        <div class="my-4 text-subtitle-1">
          <blockquote>{{ review.feedback }}</blockquote>
        </div>
      </v-card-text>
    </v-card>
  </section>
</template>

<script>
export default {
  props: {
    review: {
      type: Object,
      required: true,
    },
    showFor: {
      type: Boolean,
      default: true,
    },
    showBy: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
