<template>
  <v-app id="inspire">
    <navbar />
    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list color="transparent" rounded>
                <v-list-item link to="/employees">
                  <v-list-item-content>
                    <v-list-item-title> Employees </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/requests">
                  <v-list-item-content>
                    <v-list-item-title> Request </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/reviews">
                  <v-list-item-content>
                    <v-list-item-title> Reviews </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet min-height="70vh" rounded="lg">
              <router-view></router-view>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import navbar from "@/components/shared/navbar";
import { mapActions } from "vuex";
export default {
  data: () => ({}),
  components: {
    navbar,
  },
  methods: {
    ...mapActions({
      userDataAction: "userDataAction",
    }),
  },
  mounted() {
    this.userDataAction().then((resp) =>{
      if(resp.role === 'admin'){
        if(this.$route.fullPath === '/'){
          this.$router.push('/employees')
        }
      }else{
        this.$router.push('/pending')
      }
    })
  },
};
</script>
