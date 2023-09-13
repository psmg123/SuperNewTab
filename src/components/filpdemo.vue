<script setup>

// import {onMounted} from "vue";
//
// let dom;
// onMounted(() => {
//   dom = document.querySelector((".div"))
//
// })
//
// let play = () => {
//   let first = dom.getBoundingClientRect();
//   dom.style.left = 200+ "px"
//   let last = dom.getBoundingClientRect();
//   let X = first.left - last.left
//
//   dom.style.transform = `translateX(${X}px)`
//
//
//   requestAnimationFrame(()=>{
//     dom.style.transition="transform 1s"
//     dom.style.transform=""
//
//   })
//
// };


import {onMounted} from "vue";
import {filp} from '../../public/js/filp'

let dom;
onMounted(() => {
  dom = document.querySelector(".div")

})
onclick = () => {

  let a=new filp(dom.children)
  console.log(a)
  for (let i =0;i< dom.children.length-1;i++) {

    dom.insertBefore(dom.children[i],dom.children[parseInt(Math.random()*dom.children.length+1)])


  }
  a.play()

}


</script>

<template>
  <div class="div" style="    display: flex;text-align: center;
    width: 320px;
    flex-wrap: wrap;
    flex-direction: row;
    align-content: stretch;
    align-items: center;
    justify-content: center;">
    <div v-for="i in 200" style="width: 30px;
  height: 30px;
  outline: 1px solid black;
line-height: 30px;


    " :style="{ background:`rgb(${parseInt(Math.random()*255)},${parseInt(Math.random()*255)},${parseInt(Math.random()*255)})` }">
      {{ i }}
    </div>

  </div>
</template>

<style>

</style>