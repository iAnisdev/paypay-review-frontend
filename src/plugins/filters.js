
import Vue from 'vue'
import moment from 'moment'


Vue.filter('timeFilter', (value) => {
  return moment(value).format('DD MMM YYYY hh:mm:ss a')
})