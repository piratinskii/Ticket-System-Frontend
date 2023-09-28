<template>
  <div v-if="!skeleton">
    <Ticket v-for="ticket in tickets" :key="ticket.id" :ticket="ticket" @ticketAssigned="refreshTickets"/>
    <transition name="fade">
      <Button v-if="showToTopButton" @click="scrollToTop" icon="pi pi-angle-double-up" severity="secondary" rounded aria-label="to up" class="to-top-button"/>
    </transition>
  </div>
  <TicketSkeleton v-else v-for="n in 10" :key="n"/>
</template>

<script>
import axios from '/axios';
import Ticket from './Ticket.vue';
import TicketSkeleton from "@/components/TicketSkeleton.vue";

export default {
  name: 'TicketList',
  components: {
    TicketSkeleton,
    Ticket
  },
  props: {
    searchMode: {
      type: Object,
      default: () => ({name: 'Simple search'})
    },
    searchQuery: {
      type: String,
      default: ''
    },
    startDatetime: {
      type: Date,
      default: null
    },
    endDatetime: {
      type: Date,
      default: null
    },
    onlyMy: {
      type: Boolean,
      default: false
    },
    skeleton: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tickets: [],
      page: 1,
      loading: false,
      hasMore: true,
      showToTopButton: false,
    }
  },
  created() {
    this.loadTickets();
  },
  mounted() {
    this.addScrollListener();
  },
  beforeDestroy() {
    this.removeScrollListener();
  },
  methods: {
    refreshTickets() {
      this.clearTickets();
      this.loadTickets();
    },
    clearTickets() {
      this.tickets = []; // Очистка массива tickets
      this.page = 1; // Сброс значения page
      this.hasMore = true; // Сброс значения hasMore
    },
    async loadTickets() {
      if (this.loading || !this.hasMore) return;
      this.loading = true;
      try {
        let userId = null;
        if (this.onlyMy){
          const response = await axios.get('/user/', {withCredentials: true});
          userId = response.data.id;
        }
        let response = null;
        const params = new URLSearchParams();
        if (userId !== null) {
          params.append('user_id', userId);
        }
        params.append('page', this.page);
        if (this.searchQuery === '') {
          response = await axios.get(`/tickets/`,{params: params, withCredentials: true});
        } else {
          params.append('search_string', this.searchQuery);
          if (this.searchMode.name === 'Simple search') {
            response = await axios.get(`/tickets/search_tickets/`, {params: params, withCredentials: true});
          } else if (this.searchMode.name === 'By title') {
            response = await axios.get(`/tickets/search_by_title/`, {params: params, withCredentials: true});
          }
        }
        if (this.searchMode.name === 'By time') {
          if (this.startDatetime !== null) {
            params.append('from_time', this.startDatetime.getTime());
          }
          if (this.endDatetime !== null) {
            params.append('to_time', this.endDatetime.getTime());
          }
          response = await axios.get(`/tickets/search_by_time/`, {params: params, withCredentials: true});
        }
        if (response.data.length) {
          this.tickets = [...this.tickets, ...response.data];
          this.page += 1;
        } else {
          this.hasMore = false;
        }
        this.loading = false;
      } catch (error) {
        console.error(error);
        this.loading = false;
      }
    },
    addScrollListener() {
      this.$parent.$refs.mainContent.addEventListener('scroll', this.handleScroll);
    },
    removeScrollListener() {
      this.$parent.$refs.mainContent.removeEventListener('scroll', this.handleScroll);
    },
    handleScroll(event) {
      const nearBottom = event.target.scrollHeight - event.target.scrollTop <= event.target.clientHeight + 500;
      if (event.target.scrollTop > 200) { // show button when scrolled down 200px
        if (!this.showToTopButton) {
          this.$nextTick(() => {
            this.showToTopButton = true;
          });
        }
      } else {
        this.showToTopButton = false;
      }
      if (nearBottom) {
        this.loadTickets();
      }
    },
    scrollToTop() {
      this.$parent.$refs.mainContent.scrollTop = 0;
    },
  }
}
</script>

<style>
.to-top-button {
  position: fixed;
  right: 20px;
  bottom: 20px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}



</style>