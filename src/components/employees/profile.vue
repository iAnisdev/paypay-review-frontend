<template>
  <section class="pa-3">
    <v-row no-gutters>
      <v-col cols="4" sm="4">
        <v-card flat>
          <v-card-title>{{ user.firstname }} {{ user.lastname }}</v-card-title>
          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating
                :value="userRating"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ms-4">{{userRating}} ({{user.recivedReviews.length}})</div>
            </v-row>
            <div class="my-4 text-subtitle-1">
              {{ user.email }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="8" sm="8">
        <v-card flat class="ml-2">
          <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
            <v-tab> Pendings <v-badge :content="pendingReviews.length" v-if="pendingReviews.length > 0"></v-badge></v-tab>
            <v-tab> Received <v-badge :content="user.recivedReviews.length" v-if="user.recivedReviews.length > 0"></v-badge> </v-tab>
            <v-tab> Given <v-badge :content="user.givenReviews.length" v-if="user.givenReviews.length > 0"></v-badge> </v-tab>
          </v-tabs>

          <v-tabs-items v-if="tab == 0">
            <v-card>
              <v-data-table
                :hide-default-footer="true"
                :headers="headers"
                :items="pendingReviews"
                sort-by="calories"
                class="elevation-1"
              >
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-toolbar-title>Reviews Requested</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="primary"
                          dark
                          class="mb-2"
                          v-bind="attrs"
                          v-on="on"
                        >
                          New Reviewer
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="text-h5">Add new Reviewer</span>
                        </v-card-title>

                        <v-card-text>
                          <v-container>
                                <v-select
                                    v-model="newReviewer"
                                    :items="userAvailableForRequest"
                                    label="Reviewer's"
                                    multiple
                                    chips
                                    item-text="name"
                                    item-value="id"
                                    hint="Add user to submit reviews"
                                    persistent-hint
                                >
                                </v-select>
                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog = false"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="addReviewer"
                          >
                            Save
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="600px">
                      <v-card>
                        <v-card-title class="text-h5"
                          >Are you sure you want to delete this request?</v-card-title
                        >
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="closeDelete"
                            >Cancel</v-btn
                          >
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="deleteReviewerConfirm"
                            >OK</v-btn
                          >
                          <v-spacer></v-spacer>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-toolbar>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon small @click="deleteRequest(item)"> mdi-delete </v-icon>
                </template>
              </v-data-table>
            </v-card>
          </v-tabs-items>
          <v-tabs-items v-if="tab == 1">
            <div class="px-5 py-1" v-for="feedback in myReviews" :key="feedback.id">
              <review :review="feedback" :showFor="false"/>
            </div>
          </v-tabs-items>
            <div class="px-5 py-1" v-for="feedback in myReviews" :key="feedback.id">
              <review :review="feedback" :showBy="false"/>
            </div>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import eventBus from "@/plugins/eventBus";
import review from './../reviews/review.vue'
export default {
  components:{
    review
  },
  data() {
    return {
      tab: null,
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "fullname",
        },
        {
          text: "Email",
          value: "email",
          align: "start",
          sortable: false,
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
        },
      ],
      dialog: false,
      dialogDelete: false,
      newReviewer: [],
      requestedReviewers: [],
      targetRequest: {},
      user: {
        givenReviews: [],
        recivedReviews: []
      },
    };
  },

  computed: {
    ...mapGetters({
      employeesList: "getEmployeesList",
      myReviews: 'getMyReviews'
    }),
    otherUsers(){
      let list = this.employeesList.filter(user => {
        return user.id !== this.user.id
      }) 
      return list.map((user) => {
        user.name = user.firstname + " " + user.lastname
        return user
      })
    },
    userAvailableForRequest(){
      let requestedReviewers_ids = this.requestedReviewers.map((reviewer) => {
        return reviewer.userId
      })
      let list = this.otherUsers.filter(user => {
        return requestedReviewers_ids.indexOf(user.id) === -1
      }) 
      return list
    },
    pendingReviews(){
      return this.requestedReviewers.filter(review => {
        return review.status === 'pending'
      })
    },
    userRating(){
      if(this.user.recivedReviews){
        let totalRating = this.user.recivedReviews.map((review) => {
          return review.rating
        })
        return (totalRating.reduce((a, b) => a + b, 0)) / this.user.recivedReviews.length || 0
      }else{
        return 0
      }
    }
  },
  watch:{
    tab(newVal){
      console.log(newVal)
      if(newVal ===  1){
        this.fetchRecivedReviews(this.$route.params.id)
      }else if(newVal ===  2){
        this.fetchGivenReviews(this.$route.params.id)
      }
    },
  },
  methods: {
    ...mapActions({
      loadEmployeesAction: "loadEmployeesAction",
      addReviewRequest: "addReviewRequest",
      listCurrentUserPendingRequests: "listCurrentUserPendingRequests",
      deleteReviewRequest: "deleteReviewRequest",
      fetchRecivedReviews: "fetchRecivedReviews",
      fetchGivenReviews: "fetchGivenReviews"
    }),
    loadUserInfo(){
      eventBus.emitTriggerLoader(true);
      this.loadEmployeesAction(this.$route.params.id).then((resp) => {
          this.user = resp;
          return this.listCurrentUserPendingRequests(this.$route.params.id)
        }).then((requests) => {
          this.requestedReviewers = requests
        }).catch(({ response }) => {
          eventBus.emitTriggerSnackBar({
            type: "error",
            text: response.data.message,
          });
          this.$router.push("/employees");
        }).finally(() => {
          eventBus.emitTriggerLoader(false);
        });
    },
    addReviewer() {
      this.newReviewer.forEach((reviewer , index) => {
        let data = {
          reviewer,
          reviewFor: this.user.id
        }
        this.addReviewRequest(data).then(() => {
          eventBus.emitTriggerSnackBar({
            type: "success",
            text: 'Review request Added',
          });
        }).finally(() => {
        if(index === this.newReviewer.length -1){
          eventBus.emitTriggerLoader(false);
          this.loadUserInfo();
          this.dialog = false 
          this.newReviewer = []
        }
      });
      })
    },
    closeDelete() {
      this.targetRequest = {}
      this.dialogDelete = false
    },
    deleteRequest(request){
      this.targetRequest = request
      this.dialogDelete = true
    },
    deleteReviewerConfirm() {
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
          this.loadUserInfo();
          this.closeDelete();
        });
    },
  },
  mounted() {
    this.loadUserInfo()
    this.$store.commit('SET_MY_REVIEWS' , [])
  },
};
</script>
