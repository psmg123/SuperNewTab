<script setup>
import Desk from './content-desk.vue'
</script>


<template>
  <div id="base">


    <Desk></Desk>


  </div>
</template>


<style scoped>
#base {
  height: 500px;
  width: inherit;
  border-radius: 15px;
  margin-top: 40px;
  /* overflow: hidden; */
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.3);
}

/* 
.desk {
   

} */

.one .piece {
  width: calc(100% / 5);
  height: calc(100% / 5);
  background-color: bisque;
  outline: green 1px solid;


}
</style>