<template>
  <div class="container">
    <div :class="['custom-sidebar', isCollapsed ? 'collapsed' : '']" @transitionend="isAnimating = false" @transitionstart="isAnimating = true">
      <div class="sidebar-content">
        <div class="top-content">
          <div class="avatar-container">
            <Avatar  image="src/images/avatar.png" :class="{'mr-2' : !isCollapsed}" size="xlarge" shape="circle"/>
          </div>
          <div :class="{'menu': true, 'centered-content': isCollapsed}">
            <Button v-if="!isCollapsed" icon="pi pi-ticket" label="New tickets"  size="large" class="button-menu" :class="{'button-clicked': !onlyMy}" @click="onlyMy = false; onSearchInput()" text/>
            <Button v-if="!isCollapsed" icon="pi pi-bookmark" label="My tickets" size="large" class="button-menu" :class="{'button-clicked': onlyMy}" @click="onlyMy = true; onSearchInput()" text/>
            <Button v-if="isCollapsed" icon="pi pi-ticket" size="large" aria-label="New tickets" class="button-menu"  :class="{'button-clicked': !onlyMy}" @click="onlyMy = false; onSearchInput()" text/>
            <Button v-if="isCollapsed" icon="pi pi-bookmark" size="large" aria-label="My tickets" class="button-menu" :class="{'button-clicked': onlyMy}" @click="onlyMy = true; onSearchInput()" text/>
          </div>
        </div>
        <div class="bottom-content">
          <Button v-if="!isCollapsed" icon="pi pi-unlock" label="Logout" size="large" class="button-menu" @click="logout" text/>
          <Button v-if="!isCollapsed" icon="pi pi-angle-left" label="Collapse"  size="large" text class="button-menu" @click="collapseSidebar"/>
          <Button v-if="isCollapsed" icon="pi pi-unlock" size="large" aria-label="Logout" class="button-menu" @click="logout" text/>
          <Button v-if="isCollapsed" icon="pi pi-angle-right" size="large" aria-label="Expand" text class="button-menu" @click="expandSidebar"/>
        </div>
      </div>
    </div>
  </div>
  <div class="content">
    <div class="top-panel">
      <div class="search-container">
        <div class="p-input-icon-left">
          <i class="pi pi-search" />
          <div class="date-range" v-if="searchMode.name === 'By time'">
            <span>from</span>
            <Calendar id="calendar-start" v-model="startDatetime" showTime hourFormat="24" placeholder="__/__/____ __:__" @update:modelValue="onSearchInput" showButtonBar  />
            <span>to</span>
            <Calendar id="calendar-end" v-model="endDatetime" showTime hourFormat="24" placeholder="__/__/____ __:__" @update:modelValue="onSearchInput" showButtonBar />
          </div>
          <InputText v-else v-model="searchQuery" placeholder="Search" class="searchbar" @input="onSearchInput"/>
        </div>
        <Dropdown v-model="searchMode" :options="[{name: 'Simple search'},{name: 'By title'},{name: 'By time'}]" optionLabel="name" placeholder="Search by..." class="dropdown"  @change="clearSearch"/>
      </div>
    </div>
    <div class="main-content" ref="mainContent">
      <TicketList/>
    </div>
  </div>
</template>

<script>
import TicketList from "@/components/TicketList.vue";
import axios from "../../axios";
import store from "@/store";
import router from "../../router";
import TicketSkeleton from "@/components/TicketSkeleton.vue";

export default {
  components: {TicketSkeleton, TicketList},
  data() {
    return {
      isCollapsed: false,
      isAnimating: false,
      searchQuery: '',
      searchMode: {name: 'Simple search'},
      debounceTimer: null,
      startDatetime: null,
      endDatetime: null,
      onlyMy: false,
      skeleton: false
    };
  },
  methods: {
    clearSearch(){
      this.searchQuery = '';
      this.startDatetime = null;
      this.endDatetime = null;
      this.$refs.ticketList.clearTickets();
      this.$refs.ticketList.loadTickets();
    },
    onSearchInput() {
      this.skeleton = true;
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.$refs.ticketList.clearTickets(); // Вызов метода clearTickets() в компоненте TicketList
        this.$refs.ticketList.loadTickets(); // Загрузка новых тикетов в компоненте TicketList
        this.skeleton = false;
      }, 500);
    },
    collapseSidebar() {
      this.isCollapsed = true;
      document.documentElement.style.setProperty('--sidebar-width', '90px');
    },
    expandSidebar() {
      this.isCollapsed = false;
      document.documentElement.style.setProperty('--sidebar-width', '190px');
    },
    async logout(){
      try {
        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          withCredentials: true
        };

        const response = await axios.post('/auth/jwt/logout',null, config);

        await store.dispatch('showToast', {
          message: 'You are successfully logged out.',
          summary: 'Logout success',
          severity: 'success'
        });

        await router.push({name: 'login'})
      } catch (error) {
        await store.dispatch('showToast', {
          message: error,
          summary: 'Logout error',
          severity: 'error'
        })
      }
    }
  }
}
</script>

<style>
:root {
  --sidebar-width: 190px;
}

.container {
  display: flex;
}

.content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.custom-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  transition: width 0.1s ease-in-out;
  overflow: hidden;
  width: 190px;
  background-color: #1f1f1f;
  padding: 20px 2px;
}

.custom-sidebar.collapsed {
  width: 90px;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.top-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar-container {
  text-align: center;
}

.menu {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
  transition: justify-content 0.5s ease-in-out;
}

.centered-content {
  justify-content: center;
}

.bottom-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-menu {
  white-space: nowrap;
  overflow: hidden;
}

.top-panel {
  height: 90px;
  width: calc(100% - var(--sidebar-width));
  position: fixed;
  top: 0;
  right: 0;
  background-color: #1f1f1f; /* Change this to your desired color */
}

.main-content {
  position: fixed;
  top: 90px; /* Adjust this value based on the height of your top panel */
  bottom: 0;
  right: 0;
  width: calc(100% - var(--sidebar-width));
  background-color: #2f2f2f; /* Change this to your desired color */
  overflow-y: auto;
}

.search-container {
  width: 100%;
  padding-left: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.p-input-icon-left {
  width: 80%;
}

.searchbar {
  width: 100%;
  padding-right: 20px;
}

.dropdown {
  width: 18%;
  margin-right: 40px;
}

.searchbar, .date-range {
  width: 100%;
}

.date-range {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.87);
  background: #121212;
  padding-left: 32px;
  border: 1px solid #383838;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
  appearance: none;
  border-radius: 3px;
}

#calendar-start .p-inputtext,
#calendar-end .p-inputtext {
  border: none;
  background: none;
  outline: none;
  width: 150px; /* adjust as needed */
  text-align: center;
}


.p-input-icon-left {
  position: relative;
}


.p-input-icon-left i {
  position: absolute;
  left: 20px; /* adjust as needed */
  top: 50%;
  opacity: 0.5; /* adjust as needed */
}

.p-button.button-menu {
  width: 100%;
}

.p-button.button-clicked {
  background-color: #1f1f1f;
  color: #fff;
  border: 1px solid rgb(186, 104, 200);
  border-image-source: initial;
  border-image-slice: initial;
  border-image-width: initial;
  border-image-outset: initial;
  border-image-repeat: initial;
}
</style>