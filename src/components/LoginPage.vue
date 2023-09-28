<script>
import axios from '../../axios';
import router from "../../router";
import store from "@/store";
// TODO: Настроить стили для тоаст-уведомления

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {

  },
  methods: {
    async login() {
      const username = this.email;
      const password = this.password;

      try {
        const params = new URLSearchParams();
        params.append('username', this.email);
        params.append('password', this.password);

        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          withCredentials: true
        };

        const response = await axios.post('/auth/jwt/login', params, config);

        await store.dispatch('showToast', {
          message: 'You are successfully logged in.',
          summary: 'Authorization success',
          severity: 'success'
        });


        await router.push({name: 'main'})
      } catch (error) {
        if (error.response.status === 400) {
          await store.dispatch('showToast', {
            message: 'Invalid username or password.',
            summary: 'Authorization error',
            severity: 'error'
          })
        } else {
          await store.dispatch('showToast', {
            message: 'Ooops...\nSomething went wrong.\nPlease try again later.',
            summary: 'Authorization error',
            severity: 'error'
          })
        }
      }
    }
  }
}
</script>

<template>
  <div class="wrapper">
    <h1>Ticket System</h1>
    <div class="parent">
      <form @submit.prevent="login" class="container">
        <InputText placeholder="Email" v-model="email" class="item" />
        <Password placeholder="Password" v-model="password" class="item" :feedback="false" />
        <Button label="Login" icon="pi pi-user" class="item button" type="submit"/>
      </form>
    </div>
  </div>
</template>

<style scoped>

.wrapper {
  display: grid;
  grid-template-rows: auto 1fr auto;
  align-items: center;
  height: 330px;
  padding: 20px;
  width: 130%;
  border-radius: 50px;
  background-color: #1f0f24;
  text-align: center;
  color: #fff;
}

.wrapper h1 {
  font-size: 50px;
  font-weight: 700;
  font-family: "Calibri Light";
}

.parent {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.container {
  display: flex;
  flex-direction: column;
  width: 200px;
  margin: 0 auto;
}

.item {
  margin-bottom: 10px;
}

.button {
  margin-top: 20px;
}


</style>
