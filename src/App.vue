<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
    <snackbar/> 
    <loader v-if="showLoader"/>
  </v-app>
</template>

<script>
import snackbar from '@/components/shared/snackbar.vue'
import loader from '@/components/shared/loader.vue'
import eventBus from "@/plugins/eventBus";
export default {
  name: 'App',
  components:{
    snackbar,
    loader
  },
  data: () => ({
    showLoader: false
  }),
  methods: {
    handleLoader(status){
      this.showLoader = status
    }
  },
  created() {
    eventBus.$on("triggerLoader", this.handleLoader);
  },
  beforeDestroy() {
    eventBus.$off("triggerLoader", this.handleLoader);
  },
};
</script>
