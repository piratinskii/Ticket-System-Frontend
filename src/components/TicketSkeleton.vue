<template>
  <Card class="card" >
    <template #title>
      <div style="display: flex; justify-content: space-between;">
        <Skeleton :style="{ flex: '0 0 ' + random(20,60) + '%' }" height="1.9em"></Skeleton>
        <Skeleton width="230px" height="1.9em"></Skeleton>
      </div>
      <div style="height: 9px"></div>
      <div class="user-email"><Skeleton :style="{ width: + random(10,20) + '%'}" height="1.5em"></Skeleton></div>
    </template>
    <template #content>
      <p><Skeleton v-for="n in random(3, 15)" :key="n" :style="{ width: + random(10,100) + '%'}" height="1em" style="margin-top: 5px"></Skeleton></p>
      <div class="tags-container">
        <div style="display: flex; flex-direction: row;">
          <Skeleton v-for="n in random(1,5)" :style="{ width: + random(50,150) + 'px'}" height="1.5em" style="margin-right: 10px;" borderRadius="16px"></Skeleton>
        </div>
      </div>
      <div class="btn-container">
        <Skeleton width="150px" height="2.5em" style="margin-left: auto;"></Skeleton>
      </div>
    </template>
  </Card>
</template>

<script>
export default {
  // TODO: В случае, когда экран узкий - теги выходят за пределы окна, если при рандоме их получается больше, чем нужно.
  methods: {
    random(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  },
  name: "TicketSkeleton"
}
</script>

<style scoped>
.card{
  border: 1px solid #343434;
  border-radius: 10px;
  margin: 20px 20px;

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