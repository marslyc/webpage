<template>
    <div class="left-menu">

      <div v-for="item in routes">
        <router-link :to="item.path">{{ item.name }}</router-link>
      </div>
      
    </div>
</template>
<script setup>
import routes from '@/router/routes';

// let routemap = routes.forEach(item=>{

// });

</script>
<style scoped>
.left-menu {
  /* z-index: 100; */
  /* pointer-events: none; */
  /* padding-top: 50px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  /* height: 100vh; */
  width: 180px;
  background-color: #f5f5f5;
  overflow-x: hidden;
  overflow-y: auto;
}

.left-menu a {
  display: block;
  padding: 10px;
  color: #333;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
}
</style>