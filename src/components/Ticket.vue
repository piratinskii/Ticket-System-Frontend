<template>
  <Card class="card">
    <template #title>
      <div class="title-container">
        <span>{{ ticket.title }}</span>
        <span class="time-date">{{ new Date(ticket.creationTime).toLocaleString() }}</span>
      </div>
      <div class="user-email">{{ ticket.userEmail }}</div>
    </template>
    <template #content>
      <p v-html="formattedContent"></p>
      <div class="tags-container">
        <Badge v-for="(label, index) in ticket.labels" :key="index" :value="label" class="tag"/>
      </div>
      <div class="btn-container">
        <Button v-if="!isMyTicket && this.currentUserId !== null" label="Take to work" icon="pi pi-bolt" @click="assignToMe"/>
      </div>
    </template>
  </Card>
</template>

<script>
import axios from "../../axios";
import store from "@/store";

export default {
  data() {
    return {
      currentUserId: null,
    }
  },
  name: "Ticket",
  props: {
    ticket: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.fetchCurrentUserId();
  },
  computed: {
    formattedContent() {
      return this.ticket.content.replace(/\n/g, "<br />");
    },
    isMyTicket() {
      if (this.currentUserId === null) {
        return false;
      }
      return this.ticket.user_id === this.currentUserId;
    },
  },
  methods: {
    async fetchCurrentUserId() {
      const user_response = await axios.get('/user/', {withCredentials: true});
      this.currentUserId = user_response.data.id;
    },
    async assignToMe() {
      try {
        let userId = null;
        const user_response = await axios.get('/user/', {withCredentials: true});
        userId = user_response.data.id;
        console.log(userId)
        // TODO: Почему-то не работало, если делать через axios.post
        const response = await axios(`/tickets/${this.ticket.id}?user_id=${userId}`, {
          method: 'POST',
          withCredentials: true
        });
        await store.dispatch('showToast', {
          message: 'Ticket was assigned to you.',
          summary: 'Assignment successful',
          severity: 'success'
        });
        this.$emit('ticketAssigned');
      } catch (error) {
        console.error(error);
        await store.dispatch('showToast', {
          message: error,
          summary: 'Assignment unsuccessful',
          severity: 'error'
        });
      }
    },
  }
}
</script>

<style scoped>
.card{
  border: 1px solid #343434;
  border-radius: 10px;
  margin: 20px 20px;
}

.title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-email {
  font-size: 0.9em;
  color: grey;
}

.tags-container {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}

.tag {
  cursor: pointer;
}

.btn-container {
  text-align: right;
}
</style>
