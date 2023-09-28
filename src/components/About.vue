<script>
export default {
  name: 'About',
  data() {
    return {
    }
  },
  computed: {

  },
  methods: {

  }
}
</script>

<template>
  <div class="wrapper">
    <h1>Ticket System</h1>
    <p>Created by Evgeniy Piratinskiy</p>
  </div>
</template>

<style scoped>

.wrapper {
  display: grid;
  grid-template-rows: auto 1fr auto;
  align-items: center;
  height: 200px;
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

.wrapper p {
  font-size: 20px;
  font-weight: 700;
  font-family: "Calibri Light";
}

</style>
