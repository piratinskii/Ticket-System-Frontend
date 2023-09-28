<script>
import {mapState} from "vuex";

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['toastMessage', 'toastSeverity']),
  },
  watch: {
    toastMessage(newMessage, oldMessage) {
      if (newMessage !== oldMessage) {
        this.$toast.add({severity: this.toastSeverity, summary: this.toastMessage, life: 3000});
      }
    },
  },
  methods: {

  }
}
</script>

<template>
  <Toast/>
  <router-view/>
</template>

<style scoped>

</style>
